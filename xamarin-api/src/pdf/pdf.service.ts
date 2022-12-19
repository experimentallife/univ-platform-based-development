import { Inject, Injectable } from '@nestjs/common';
import { PdfRequest } from './pdf.request';

import puppeteer from 'puppeteer';
import { PDF_OPTIONS } from './pdf.constant';
import { PdfOptions } from './pdf.interface';
import { join } from 'path';

@Injectable()
export class PdfService {
  constructor(@Inject(PDF_OPTIONS) private readonly options: PdfOptions) {}

  public async convert(request: PdfRequest): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(request.html, { waitUntil: 'domcontentloaded' });

    await page.emulateMediaType('screen');

    const filePath = join(this.options.outPath, request.fileName);

    await page.pdf({
      path: filePath,
      margin: request.margin,
      printBackground: request.printBackground,
      format: request.format,
    });

    await browser.close();

    return filePath;
  }
}
