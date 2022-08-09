import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppDataSource } from './data-source';
import { User } from './users/entities/user.entity';
import { userSeed } from './users/seed/user.seed';

const PORT = process.env.PORT || 4000;

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

const seedDB = async () => {
  const users = await AppDataSource.manager.find(User, { take: 1 });
  if (users.length === 0) {
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, userSeed),
    );
  }
};

AppDataSource.initialize()
  .then(async () => {
    await seedDB();
    bootstrap().catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
