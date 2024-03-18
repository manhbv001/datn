import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';
import { PostActionTypes } from './post.enum';

@Entity('post_actions')
export class PostAction extends BaseEntity {
  @Column()
  @ApiProperty({ enum: PostActionTypes })
  type: PostActionTypes;

  @ManyToOne(() => Post, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'post_id' })
  @ApiProperty({
    type: () => Post,
    required: false,
  })
  post: Post;

  @Column()
  @ApiProperty()
  post_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user: User;

  @Column()
  @ApiProperty()
  user_id: number;
}
