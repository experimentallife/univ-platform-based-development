import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { S3_OPTIONS } from './s3.contant';
import { S3AsyncOptions, S3OptionsFactory } from './s3.interface';
import { S3Service } from './s3.service';

@Global()
@Module({})
export class S3Module {
  static registerAsync(options: S3AsyncOptions): DynamicModule {
    return {
      module: S3Module,
      providers: [...this.createAsyncOptionsProvider(options), S3Service],
      exports: [S3Service],
    };
  }

  private static createAsyncOptionsProvider(
    options: S3AsyncOptions,
  ): Provider[] {
    if (!options.useClass) throw new Error('Required configuration not found.');

    return [
      options.useClass,
      {
        provide: S3_OPTIONS,
        useFactory: async (optionsFactory: S3OptionsFactory) =>
          await optionsFactory.createMailerOptions(),
        inject: [options.useClass],
      },
    ];
  }
}
