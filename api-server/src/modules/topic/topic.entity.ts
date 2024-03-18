import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('topics')
export class Topic extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @ManyToMany(() => Post, (post) => post.topics)
  @ApiProperty({ isArray: true, type: Post, required: false })
  posts: Post[];
}
