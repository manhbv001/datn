import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFolders } from 'src/shared/enum/upload-folders.enum';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { Utils } from 'src/utils/data.util';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';
import { Seo } from '../seo/seo.entity';
import { Topic } from '../topic/topic.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { PostAction } from './post-action.entity';
import { PostComment } from './post-comment.entity';
import {
  CommentPostDto,
  CreatePostDto,
  QueryPostDto,
  ReactPostDto,
} from './post.dto';
import { Post } from './post.entity';
import { PostActionTypes, PostFilters } from './post.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repository: Repository<Post>,
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    @InjectRepository(PostComment)
    private commentRepository: Repository<PostComment>,
    private awsS3Service: AwsS3Service,
    private userService: UserService
  ) {}

  /**
   *
   * Tạo mới hoặc chỉnh sửa một Post
   * @param {(number | null)} id - ID của post (trong trường hợp chỉnh sửa, NULL nếu tạo mới)
   * @param {CreatePostDto} payload - Tham số của post
   * @param {User} reqUser - Dữ liệu requestor
   * @param {Express.Multer.File} [thumbnailFile] - File ảnh thumbnail của post
   * @return {*}
   * @memberof PostService
   */
  async createOrUpdatePost(
    id: number | null,
    payload: CreatePostDto,
    reqUser: User,
    thumbnailFile?: Express.Multer.File
  ) {
    let post: Post;

    if (id) {
      post = await this.repository.findOneOrFail({
        where: {
          id,
          author_id: reqUser.id,
        },
        relations: ['seo'],
      });
    } else {
      post = new Post();
    }

    post.title = payload.title;
    post.content = payload.content;
    post.author_id = reqUser.id;
    post.status = payload.status;

    const seo = post.seo || new Seo();
    seo.description = payload.description;

    if (thumbnailFile) {
      const rs = await this.awsS3Service.upload(
        thumbnailFile,
        UploadFolders.Thumbnail
      );
      seo.facebook_image = rs.Key;
      seo.twitter_image = rs.Key;
      seo.thumbnail = rs.Key;
    }
    post.seo = seo;

    const topics = await this.topicRepository.findBy({
      id: In(payload.topic_ids),
    });
    post.topics = topics;

    return this.repository.save(post);
  }

  /**
   *
   * Like/Dislike/Markbook một post. Action sẽ được revert nếu được thực thi 2 lần
   * @param {number} postId - ID của post được react
   * @param {ReactPostDto} payload - Tham số react
   * @param {User} reqUser - Dữ liệu requestor
   * @return {*}
   * @memberof PostService
   */
  async reactPost(postId: number, payload: ReactPostDto, reqUser: User) {
    const post = await this.repository.findOne({
      where: {
        id: postId,
      },
      relations: ['actions'],
    });

    const isDuplicated = post.actions.find(
      (action) => action.user_id === reqUser.id && action.type === payload.type
    );

    if (!!isDuplicated) {
      post.actions = post.actions.filter((item) => item.id !== isDuplicated.id);
    } else {
      const newAction = new PostAction();
      newAction.post_id = post.id;
      newAction.user_id = reqUser.id;
      newAction.type = payload.type;
      post.actions.push(newAction);

      if (payload.type === PostActionTypes.Dislike)
        post.actions = post.actions.filter(
          (action) =>
            !(
              action.user_id === reqUser.id &&
              action.type === PostActionTypes.Like
            )
        );
      else if (payload.type === PostActionTypes.Like)
        post.actions = post.actions.filter(
          (action) =>
            !(
              action.user_id === reqUser.id &&
              action.type === PostActionTypes.Dislike
            )
        );
    }

    await this.repository.save(post);
    return true;
  }

  async getPostBySlug(slug: string) {
    const queryBuilder = this.repository
      .createQueryBuilder('post')
      .addSelect('post.content')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topics', 'topics')
      .leftJoinAndSelect('post.seo', 'seo')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'comment_user')
      .loadRelationCountAndMap('post.likes', 'post.actions', 'action', (qb) =>
        qb.where('action.type = :type', { type: PostActionTypes.Like })
      )
      .loadRelationCountAndMap(
        'post.dislikes',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type', { type: PostActionTypes.Dislike })
      )
      .loadRelationCountAndMap(
        'post.bookmarks',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type', { type: PostActionTypes.Bookmark })
      )
      .where('post.slug = :slug', { slug });

    const post = await queryBuilder.getOne();
    if (!post) throw new NotFoundException();

    const relavants = await this.repository.find({
      where: {
        topics: { id: In(post.topics.map((topic) => topic.id)) },
        id: Not(post.id),
      },
      take: 3,
    });

    return { post, relavants };
  }

  async viewPost(id: number) {
    const post = await this.repository.findOneBy({ id });
    this.repository.update(post.id, {
      views: post.views + 1,
    });

    return true;
  }

  async getReactStatus(postId, reqUser: User) {
    const data = await this.repository
      .createQueryBuilder('post')
      .loadRelationCountAndMap('post.liked', 'post.actions', 'action', (qb) =>
        qb.where('action.type = :type and action.user_id = :userId', {
          type: PostActionTypes.Like,
          userId: reqUser.id,
        })
      )
      .loadRelationCountAndMap(
        'post.disliked',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type and action.user_id = :userId', {
            type: PostActionTypes.Dislike,
            userId: reqUser.id,
          })
      )
      .loadRelationCountAndMap(
        'post.bookmarked',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type and action.user_id = :userId', {
            type: PostActionTypes.Bookmark,
            userId: reqUser.id,
          })
      )
      .where('post.id = :postId', { postId })
      .getOne();

    return {
      liked: (data as any).liked,
      disliked: (data as any).disliked,
      bookmarked: (data as any).bookmarked,
    };
  }

  async commentPost(postId: number, payload: CommentPostDto, user: User) {
    const newComment = new PostComment();
    const post = await this.repository.findOneBy({ id: postId });
    newComment.content = payload.content;
    newComment.post = post;
    newComment.user = user;

    return this.commentRepository.save(newComment);
  }

  async queryPosts(params: QueryPostDto, reqUser?: User) {
    const { where, skip, take } = Utils.parseQueryDto(params);
    const queryParams: FindOptionsWhere<Post & QueryPostDto> = {
      ...where,
    };
    const filter = queryParams.filter;
    delete queryParams.topic_ids;
    delete queryParams.filter;

    const queryBuilder = this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topics', 'topics')
      .leftJoinAndSelect('post.actions', 'actions')
      .leftJoinAndSelect('post.seo', 'seo')
      .loadRelationCountAndMap('post.likes', 'post.actions', 'action', (qb) =>
        qb.where('action.type = :type', { type: PostActionTypes.Like })
      )
      .loadRelationCountAndMap(
        'post.dislikes',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type', { type: PostActionTypes.Dislike })
      )
      .loadRelationCountAndMap(
        'post.bookmarks',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type', { type: PostActionTypes.Bookmark })
      )
      .loadRelationCountAndMap('post.comment_count', 'post.comments')
      .where(queryParams);

    if (filter === PostFilters.Following) {
      if (!reqUser) return { posts: [], total: 0 };
      const followingIds = await this.userService.getFollowingIds(reqUser.id);
      if (!followingIds.length) return { posts: [], total: 0 };
      queryBuilder
        .andWhere('post.author_id IN (:...followingIds)', {
          followingIds,
        })
        .orderBy(
          `post.${params.order_key || 'created_at'}`,
          params.order_by || 'DESC'
        );
    } else if (filter === PostFilters.Bookmarked) {
      if (!reqUser) return { posts: [], total: 0 };
      queryBuilder
        .andWhere('actions.user_id = :userId AND actions.type = :actionType', {
          userId: reqUser.id,
          actionType: PostActionTypes.Bookmark,
        })
        .orderBy(
          `post.${params.order_key || 'created_at'}`,
          params.order_by || 'DESC'
        );
    } else if (filter === PostFilters.Trending) {
      queryBuilder.orderBy('post.views', 'DESC');
    } else if (filter === PostFilters.Discuss) {
      queryBuilder.andWhere('topics.id = :discussTopicId', {
        discussTopicId: 5,
      });
    } else {
      queryBuilder.orderBy(
        `post.${params.order_key || 'created_at'}`,
        params.order_by || 'DESC'
      );
    }

    queryBuilder.take(take).skip(skip);

    if (where.topic_ids)
      queryBuilder.andWhere('topics.id IN (:...topicIds)', {
        topicIds: where.topic_ids?.split(','),
      });

    const [rs, count] = await queryBuilder.getManyAndCount();

    return {
      posts: rs.map((p) => ({ ...p, content: '' })),
      total: count,
    };
  }

  async deletePost(id: number, reqUser: User) {
    const post = await this.repository.findOneBy({
      id,
    });

    if (post.author_id !== reqUser.id) throw new ForbiddenException();

    await this.repository.softDelete(id);

    return true;
  }

  async queryAdminPosts(params: QueryPostDto, userId: number) {
    const { where, skip, take } = Utils.parseQueryDto(params);
    const queryParams: FindOptionsWhere<Post & QueryPostDto> = {
      ...where,
      author_id: userId,
    };

    const queryBuilder = this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topics', 'topics')
      .leftJoinAndSelect('post.actions', 'actions')
      .loadRelationCountAndMap('post.likes', 'post.actions', 'action', (qb) =>
        qb.where('action.type = :type', { type: PostActionTypes.Like })
      )
      .loadRelationCountAndMap(
        'post.dislikes',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type', { type: PostActionTypes.Dislike })
      )
      .loadRelationCountAndMap(
        'post.bookmarks',
        'post.actions',
        'action',
        (qb) =>
          qb.where('action.type = :type', { type: PostActionTypes.Bookmark })
      )
      .loadRelationCountAndMap('post.comment_count', 'post.comments')
      .where(queryParams)
      .take(take)
      .skip(skip);

    if (where.topic_ids)
      queryBuilder.andWhere('topics.id IN (:...topicIds)', {
        topicIds: where.topic_ids?.split(','),
      });

    const [rs, count] = await queryBuilder.getManyAndCount();

    return {
      posts: rs,
      total: count,
    };
  }

  async getPostById(id: number) {
    return this.repository
      .createQueryBuilder('post')
      .addSelect('post.content')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.topics', 'topics')
      .leftJoinAndSelect('post.seo', 'seo')
      .getOne();
  }
}
