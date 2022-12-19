import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MAILER_OPTIONS } from './mailer.constant';
import { MailerOptions } from './mailer.interface';
import { MailerRequest } from './mailer.request';

@Injectable()
export class MailerService {
  private readonly client: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(@Inject(MAILER_OPTIONS) private readonly options: MailerOptions) {
    this.client = createTransport(this.options);
  }

  public async send(request: MailerRequest) {
    return this.client.sendMail(request);
  }
}
