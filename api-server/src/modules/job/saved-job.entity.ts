import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Job } from './job.entity';

@Entity('saved_jobs')
export class SavedJob extends BaseEntity {
  @ManyToOne(() => Job, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'job_id' })
  @ApiProperty({
    type: () => Job,
    required: false,
  })
  job: Job;

  @Column()
  @ApiProperty()
  job_id: number;

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
