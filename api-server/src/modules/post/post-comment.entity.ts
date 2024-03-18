import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Entity('post_comments')
export class PostComment extends BaseEntity {
  @Column('text')
  @ApiProperty()
  content: string;

  @ManyToOne(() => Post)
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
