/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  @Cron('0 0 0 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  removeStaticFiles() {
    this.logger.log('Start removing static files');
    const uploadsDir = path.join(
      __dirname,
      '../../../',
      process.env.STATIC_ENDPOINT
    );

    fs.readdir(uploadsDir, (err, files) => {
      if (!(files?.length > 0)) return;

      files.forEach((file) => {
        if (file != '.gitkeep') {
          fs.stat(path.join(uploadsDir, file), function (err, stat) {
            if (err) {
              return this.logger.error(err);
            }
            const now = new Date().getTime();
            const endTime =
              new Date(stat.ctime).getTime() +
              Number(process.env.FILE_LIFE_TIME || 36000000);
            if (now > endTime) {
              return rimraf(path.join(uploadsDir, file), function (err) {
                if (err) {
                  return this.logger.error(err);
                }
              });
            }
          });
        }
      });
    });
  }
}
