import * as ejs from 'ejs';
import { join } from 'path';
import { readFileSync } from 'fs';

import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer';
import { PdfService } from './pdf';
import { SendEmailDto } from './app.entities';

@Injectable()
export class AppService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly mailerService: MailerService,
  ) {}

  private getTemplateHTML(body: any) {
    const template = readFileSync(
      join(process.cwd(), 'static/index.ejs'),
    ).toString();
    return ejs.render(template, body);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async send(dto: SendEmailDto) {
    const html = this.getTemplateHTML(dto.htmlRender);

    const filePath = await this.pdfService.convert({
      html: html,
      fileName: 'document.pdf',
      margin: {
        top: '100px',
        right: '50px',
        bottom: '100px',
        left: '50px',
      },
      printBackground: true,
      format: 'A4',
    });

    return this.mailerService.send({
      from: 'admin@chad.dev',
      to: dto.to,
      subject: dto.subject,
      html: dto.content,
      attachments: [
        {
          filename: 'curriculum.pdf',
          path: filePath,
          contentType: 'application/pdf',
        },
      ],
    });
  }
}
