import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { PDF_OPTIONS } from './pdf.constant';
import { PdfAsyncOptions, PdfOptionsFactory } from './pdf.interface';
import { PdfService } from './pdf.service';

@Global()
@Module({})
export class PdfModule {
  static registerAsync(options: PdfAsyncOptions): DynamicModule {
    return {
      module: PdfModule,
      providers: [...this.createAsyncOptionsProvider(options), PdfService],
      exports: [PdfService],
    };
  }

  private static createAsyncOptionsProvider(
    options: PdfAsyncOptions,
  ): Provider[] {
    if (!options.useClass) throw new Error('Required configuration not found.');

    return [
      options.useClass,
      {
        provide: PDF_OPTIONS,
        useFactory: async (optionsFactory: PdfOptionsFactory) =>
          await optionsFactory.createPdfOptions(),
        inject: [options.useClass],
      },
    ];
  }
}
