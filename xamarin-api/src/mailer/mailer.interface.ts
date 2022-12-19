import { ModuleMetadata, Type } from '@nestjs/common';

export interface MailerOptions {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface MailerOptionsFactory {
  createMailerOptions(): Promise<MailerOptions> | MailerOptions;
}

export interface MailerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<MailerOptionsFactory>;
  injet?: any[];
}
