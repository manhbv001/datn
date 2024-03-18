import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFolders } from 'src/shared/enum/upload-folders.enum';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { Repository } from 'typeorm';
import { PostActionTypes } from '../post/post.enum';
import { CreateUserDto, FollowAuthorDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private awsS3Service: AwsS3Service
  ) {}

  async createUser(payload: CreateUserDto) {
    const newUser = new User();

    const isEmailExisted = await this.repository.exist({
      where: {
        email: payload.email,
      },
    });
    if (isEmailExisted) throw new BadRequestException('Email đã tồn tại!');

    const isUsernameExisted = await this.repository.exist({
      where: {
        username: payload.username,
      },
    });
    if (isUsernameExisted)
      throw new BadRequestException('Nickname đã tồn tại!');

    newUser.email = payload.email;
    newUser.username = payload.username;
    newUser.fullname = payload.fullname;
    newUser.type = payload.type;
    newUser.password = payload.password;

    await this.repository.save(newUser);

    return newUser;
  }

  async update(
    payload: UpdateUserDto,
    reqUser: User,
    avatarFile?: Express.Multer.File
  ) {
    const user = await this.repository.findOneBy({ id: reqUser.id });

    if (avatarFile) {
      const rs = await this.awsS3Service.upload(
        avatarFile,
        UploadFolders.Avatar
      );
      user.avatar_url = rs.Key;
    }
    user.username = payload.username;
    user.fullname = payload.fullname;

    await this.repository.save(user);

    return user;
  }

  async bindToEnterprise(id: number, enterpriseId: number) {
    return await this.repository.update(
      { id },
      { enterprise_id: enterpriseId }
    );
  }

  async follow(payload: FollowAuthorDto, reqUser: User) {
    if (payload.author_id === reqUser.id) throw new ConflictException();

    const author = await this.repository.findOne({
      where: {
        id: payload.author_id,
      },
      relations: ['followers'],
    });

    const isExisted = author.followers.some(
      (follower) => follower.id === reqUser.id
    );

    if (isExisted)
      author.followers = author.followers.filter(
        (follower) => follower.id !== reqUser.id
      );
    else author.followers.push(reqUser);

    await this.repository.save(author);
    return null;
  }

  async getUserProfile(username: string) {
    const { password, ...user } = await this.repository.findOne({
      where: {
        username,
      },
      relations: ['followers', 'followings', 'posts', 'posts.actions'],
    });
    const follower_count = user.followers.length;
    const following_count = user.followings.length;
    const post_count = user.posts.length;
    const view_count = user.posts.reduce((prev, cur) => prev + cur.views, 0);
    const like_count = user.posts.reduce(
      (prev, cur) =>
        prev +
        cur.actions.filter((act) => act.type === PostActionTypes.Like).length,
      0
    );

    return {
      ...user,
      follower_count,
      following_count,
      post_count,
      view_count,
      like_count,
    };
  }

  async getFeaturedAuthors(reqUser?: User) {
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .leftJoin('user.posts', 'post')
      .leftJoin('user.followers', 'follower')
      .select(
        'user.*, COUNT(DISTINCT post.id) as post_count, COUNT(DISTINCT follower.id) as follower_count'
      )
      .groupBy('user.id')
      .orderBy('post_count', 'DESC')
      .limit(5);

    if (reqUser) {
      queryBuilder
        .leftJoin('user.followers', 'followed', 'followed.id = :userId', {
          userId: reqUser.id,
        })
        .addSelect('COUNT(DISTINCT followed.id) as followed');
    }

    const authors = await queryBuilder.getRawMany();

    return authors.filter(
      (author) =>
        author.id !== reqUser?.id && (author as any).post_count !== '0'
    );
  }

  async getFollowStatus(authorId: number, reqUser: User) {
    const author = await this.repository.findOne({
      where: {
        id: authorId,
      },
      relations: ['followers'],
    });

    if (!author) return { followed: false };
    const followed = author.followers.some(
      (follower) => follower.id === reqUser.id
    );

    return { followed };
  }

  async getFollowerIds(userId: number) {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      relations: ['followers'],
    });
    const followerIds = user.followers.map((u) => u.id);
    return followerIds;
  }

  async getFollowingIds(userId: number) {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      relations: ['followings'],
    });
    const followingIds = user.followings.map((u) => u.id);
    return followingIds;
  }

  async getFollowings(userId: number, reqUser: User, checkStatus = true) {
    const followingIds = await this.getFollowingIds(userId);
    if (!followingIds.length) return [];

    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .loadRelationCountAndMap('user.post_count', 'user.posts')
      .loadRelationCountAndMap('user.follower_count', 'user.followers');

    if (checkStatus && reqUser)
      queryBuilder.loadRelationCountAndMap(
        'user.followed',
        'user.followers',
        'follower',
        (qb) => qb.where('follower.id = :userId', { userId: reqUser.id })
      );
    queryBuilder.where('user.id IN (:...followingIds)', { followingIds });

    return queryBuilder.getMany();
  }

  async getFollowers(userId: number, reqUser: User, checkStatus = true) {
    const followerIds = await this.getFollowerIds(userId);
    if (!followerIds.length) return [];

    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .loadRelationCountAndMap('user.post_count', 'user.posts')
      .loadRelationCountAndMap('user.follower_count', 'user.followers');

    if (checkStatus && reqUser)
      queryBuilder.loadRelationCountAndMap(
        'user.followed',
        'user.followers',
        'follower',
        (qb) => qb.where('follower.id = :userId', { userId: reqUser.id })
      );
    queryBuilder.where('user.id IN (:...followerIds)', { followerIds });

    return queryBuilder.getMany();
  }

  async setApplicantProfile(id: number, profileId: number) {
    await this.repository.update(id, { applicant_profile_id: profileId });
  }
}
