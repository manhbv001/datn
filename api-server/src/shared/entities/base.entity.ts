import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: 1 })
  public is_active: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  public updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  public deleted_at: Date;
}
