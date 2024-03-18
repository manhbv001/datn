import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './asset.entity';

export class AssetService {
  constructor(@InjectRepository(Asset) repo) {
  }
}
