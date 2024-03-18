import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as CryptoJS from 'crypto-js';
import { cloneDeep } from 'lodash';
import { Between, FindOptionsOrder, Like } from 'typeorm';
import { DEFAUT_PAGE_SIZE } from '../constants/common.contant';
import { IPaginatePayload } from '../interfaces/paginate.interface';
import { BaseQueryDto } from '../shared/dto/BaseQueryDto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

export class Utils {
  public static encodeString(plain: string): string {
    return CryptoJS.AES.encrypt(plain, process.env.HASH_KEY).toString();
  }

  public static decodeString(cipher: string): string {
    const bytes = CryptoJS.AES.decrypt(cipher, process.env.HASH_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public static badRequestExceptionFactory(
    validationErrors: ValidationError[] = []
  ) {
    const errors = validationErrors.map((e) => ({
      field: e.property,
      message: Object.keys(e.constraints)
        .map((key) => e.constraints[key])
        .join('\n'),
    }));
    return new BadRequestException(errors);
  }

  public static roundByUnit(v: number, unitLevel = 1000) {
    return Math.round(v / unitLevel) * unitLevel;
  }

  public static paginate(payload?: IPaginatePayload):
    | object
    | {
        skip: number;
        take: number;
      } {
    if (!payload) return {};

    const currentPage = payload.page > 0 ? payload.page : 1;
    const pageSize = payload.size > 0 ? payload.size : DEFAUT_PAGE_SIZE;

    return {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    };
  }

  public static parseQueryDto<T>(dtoPayload: BaseQueryDto): {
    where: Record<string, any>;
    order: FindOptionsOrder<T>;
    skip: number;
    take: number;
  } {
    const dto = cloneDeep(dtoPayload);
    const paginate = {
      page: dto.page,
      size: dto.size,
    };
    const search = dto.search;
    const order = {};
    order[dto.order_key || 'created_at'] = dto.order_by || 'DESC';
    let timeRange;

    if (dto.start_date) {
      timeRange = Between(
        new Date(
          moment(dto.start_date)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .valueOf()
        ),
        dto.end_date
          ? new Date(
              moment(dto.end_date)
                .utcOffset(0)
                .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                .toISOString()
            )
          : new Date()
      );
    }
    delete dto.page;
    delete dto.size;
    delete dto.search;
    delete dto.start_date;
    delete dto.end_date;
    delete dto.order_by;
    delete dto.order_key;

    const where: any = { ...dto };
    if (search) where.title = Like(`%${search}%`);
    if (timeRange) where.created_at = timeRange;
    const { skip, take } = this.paginate(paginate) as {
      skip: number;
      take: number;
    };
    return {
      where,
      order,
      skip,
      take,
    };
  }

  public static toSlug(string: string) {
    let slug: string;
    slug = string.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ''
    );
    slug = slug.replace(/ /gi, '-');
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  }

  public static rawToEntity<T>(raw: Record<string, any>, alias: string) {
    const data: any = {};
    Object.keys(raw).forEach((key) => {
      const currentKey = key.split(alias)[1];
      data[currentKey] = raw[key];
    });

    return data as T;
  }
}
