import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { setupCors } from './config/cors.config';
import { setupSwagger } from './config/swagger.config';
import { setupShutdownHooks } from './config/shutdown.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.register(fastifyCookie, { secret: 'my-secret' });
  app.setGlobalPrefix('api');
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT') || 5000;
  setupCors(app);
  setupSwagger(app, '1.0.0');
  setupShutdownHooks(app);
  await app.listen(port, () => console.log(`server 🚀 on PORT ${port}`));
}
bootstrap();
