import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { Utils } from 'src/utils/data.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Seo } from '../seo/seo.entity';
import { Topic } from '../topic/topic.entity';
import { User } from '../user/user.entity';
import { PostAction } from './post-action.entity';
import { PostComment } from './post-comment.entity';
import { PostStatuses } from './post.enum';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  slug: string;

  @Column('text', { select: false })
  @ApiProperty()
  content: string;

  @Column({ default: PostStatuses.Public })
  @ApiProperty({ enum: PostStatuses, default: PostStatuses.Public })
  status: PostStatuses;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  @ApiProperty({ required: false, type: () => User })
  author: User;

  @Column()
  @ApiProperty()
  author_id: number;

  @Column({ default: 0 })
  @ApiProperty()
  views: number;

  @OneToMany(() => PostAction, (action) => action.post, { cascade: true })
  @ApiProperty({
    isArray: true,
    type: PostAction,
    required: false,
  })
  actions: PostAction[];

  @OneToMany(() => PostComment, (comment) => comment.post)
  @ApiProperty({
    isArray: true,
    type: PostComment,
    required: false,
  })
  comments: PostComment[];

  @ManyToMany(() => Topic, (topic) => topic.posts)
  @ApiProperty({
    isArray: true,
    type: Topic,
    required: false,
  })
  @JoinTable()
  topics: Topic[];

  @OneToOne(() => Seo, (seo) => seo.post, { cascade: true })
  seo: Seo;

  @BeforeInsert()
  @BeforeUpdate()
  genSlug() {
    this.slug = Utils.toSlug(this.title);
  }
}
