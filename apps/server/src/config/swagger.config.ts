import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, appVersion: string) {
  const config = new DocumentBuilder()
    .setTitle('Pacol-CRM API')
    .setDescription('Backend API of Pacol-CRM')
    .setVersion(appVersion)
    // .setContact('Podkrepi.bg', 'https://podkrepi.bg', 'team@podkrepi.bg')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // operationIdFactory: (controllerKey: string, methodKey: string) =>
    //   controllerKey.replace(/controller/gi, '') + '.' + methodKey,
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('swagger', app, document);
}
