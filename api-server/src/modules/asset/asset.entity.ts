import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { EAssetType } from './asset.enum';

@Entity('assets')
export class Asset extends BaseEntity {
  @Column('int')
  type: EAssetType;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  extension: string;

  @Column({ nullable: true })
  description: string;
}
