import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { Topic } from '../topic/topic.entity';
import { UserModule } from '../user/user.module';
import { PostAdminController } from './post-admin.controller';
import { PostComment } from './post-comment.entity';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  providers: [PostService, AwsS3Service],
  controllers: [PostController, PostAdminController],
  imports: [
    TypeOrmModule.forFeature([Post, Topic, PostComment]),
    UserModule,
    MulterModule.register(),
  ],
  exports: [PostService],
})
export class PostModule {}
