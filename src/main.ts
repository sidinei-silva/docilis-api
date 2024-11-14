import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { Environment } from './envoriment';
import { AllExceptionFilter } from './shared/core/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  configureSwagger(app);

  //Validation and Errors
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  //Middlewares
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  //Start the app
  const appPort = Environment.api.port;
  await app.listen(appPort, () => {
    console.log(`App is running on port ${appPort}`);
  });
}

const configureSwagger = (app: INestApplication) => {
  const isProduction = Environment.api.nodeEnv === 'production';
  if (isProduction) {
    return;
  }
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Docilis API')
    .setDescription('Docilis API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
};
bootstrap();
