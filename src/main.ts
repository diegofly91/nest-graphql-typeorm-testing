import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
//import { graphqlUploadExpress } from 'graphql-upload-ts';

const configService = new ConfigService();
// definimos la ruta
const crPath = configService.get('SSL_CERTIFICATE');
const pkPath = configService.get('SSL_CERTIFICATE_KEY');
const options: any = {};

// validamos si los archivos existen
if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
  // cargamos los archivos sobre las options
  options.httpsOptions = {
    cert: fs.readFileSync(crPath),
    key: fs.readFileSync(pkPath),
  };
}

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  const logger = new Logger('Bootstrap');
  const host = AppModule.host || '127.0.0.1';
  const port = AppModule.port || 3000;
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints),
        );
        return new BadRequestException(errorMessages.toString());
      },
      forbidUnknownValues: false,
      transform: true,
    }),
  );
  //app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  await app.listen(port, host);
  logger.log(`Server is running in ${await app.getUrl()}/graphql`);
})();
