import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config/dist';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // Setup config service
  const configService = app.get(ConfigService);

  // Setup security
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
    );
    
  // Start app
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
