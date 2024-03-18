import {
  ClassSerializerInterceptor,
  NestInterceptor,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config as envConfig } from 'dotenv';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { ResponseFormatInterceptor } from './interceptors/response-format.interceptor';
import { Utils } from './utils/data.util';

envConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_DOMAIN, process.env.ADMIN_DOMAIN],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  // use pipes
  const pipes: PipeTransform<any, any>[] = [];
  pipes.push(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: Utils.badRequestExceptionFactory,
    })
  );
  app.useGlobalPipes(...pipes);

  const interceptors: NestInterceptor[] = [
    new ClassSerializerInterceptor(app.get(Reflector)),
  ];

  // setup swagger documentation
  const config = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('3.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (process.env.ENVIRONMENT !== 'LOCAL') {
    interceptors.push(new ExceptionInterceptor());
  }

  interceptors.push(new ResponseFormatInterceptor());

  app.useGlobalInterceptors.apply(this, interceptors);

  await app.listen(process.env.PORT);
}

bootstrap();
