import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerConfiguration } from './config/mailer.configuration';
import { PdfConfiguration } from './config/pdf.configuration';
import { MailerModule } from './mailer';
import { PdfModule } from './pdf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MailerModule.registerAsync({
      useClass: MailerConfiguration,
    }),
    PdfModule.registerAsync({
      useClass: PdfConfiguration,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
