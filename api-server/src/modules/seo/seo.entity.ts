import BaseEntity from 'src/shared/entities/base.entity';
import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('seos')
export class Seo extends BaseEntity {
  @Column('text', { nullable: true })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  twitter_image: string;

  @Column({ nullable: true })
  facebook_image: string;

  @OneToOne(() => Post, (post) => post.seo)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @AfterLoad()
  loadThumbnailUrl() {
    if (this.thumbnail)
      this.thumbnail = `${process.env.AWS_S3_STATIC_ENDPOINT}/${this.thumbnail}`;
  }
}
