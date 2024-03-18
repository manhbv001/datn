import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('resumes')
export class Resume extends BaseEntity {
  @Column()
  name: string;

  @Column()
  template_id: number;

  @Column('text')
  information: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  user: User;
}
