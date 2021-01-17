import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true, //dto의 아무런 decorator가 없는 어떠한 property의 object를 거름
      forbidNonWhitelisted : true, //잘못된 데이터를 Send할 경우  Request 자체를 차단
      transform : true //타입을 자동으로 변환
    })
  );
  await app.listen(3000);
}
bootstrap();
