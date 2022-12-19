import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from 'src/mailer';

@Injectable()
export class MailerConfiguration implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      service: this.configService.get<string>('MAILER_SERVICE'),
      auth: {
        user: this.configService.get<string>('MAILER_USERNAME'),
        pass: this.configService.get<string>('MAILER_PASSWORD'),
      },
    };
  }
}
