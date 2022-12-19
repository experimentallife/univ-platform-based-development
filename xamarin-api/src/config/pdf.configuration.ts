import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PdfOptions, PdfOptionsFactory } from 'src/pdf';

@Injectable()
export class PdfConfiguration implements PdfOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createPdfOptions(): PdfOptions | Promise<PdfOptions> {
    return {
      outPath: join(
        process.cwd(),
        this.configService.get<string>('PDF_OUTPUT'),
      ),
    };
  }
}
