import { ModuleMetadata, Type } from '@nestjs/common';

export interface PdfOptions {
  outPath: string;
}

export interface PdfOptionsFactory {
  createPdfOptions(): Promise<PdfOptions> | PdfOptions;
}

export interface PdfAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<PdfOptionsFactory>;
  injet?: any[];
}
