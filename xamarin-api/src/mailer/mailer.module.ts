import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MAILER_OPTIONS } from './mailer.constant';
import { MailerAsyncOptions, MailerOptionsFactory } from './mailer.interface';
import { MailerService } from './mailer.service';

@Global()
@Module({})
export class MailerModule {
  static registerAsync(options: MailerAsyncOptions): DynamicModule {
    return {
      module: MailerModule,
      providers: [...this.createAsyncOptionsProvider(options), MailerService],
      exports: [MailerService],
    };
  }

  private static createAsyncOptionsProvider(
    options: MailerAsyncOptions,
  ): Provider[] {
    if (!options.useClass) throw new Error('Required configuration not found.');

    return [
      options.useClass,
      {
        provide: MAILER_OPTIONS,
        useFactory: async (optionsFactory: MailerOptionsFactory) =>
          await optionsFactory.createMailerOptions(),
        inject: [options.useClass],
      },
    ];
  }
}
