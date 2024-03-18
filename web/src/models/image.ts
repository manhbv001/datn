import { BaseModel } from './common';

export interface IImage extends BaseModel {
  source: string;
  alt: string;
}
