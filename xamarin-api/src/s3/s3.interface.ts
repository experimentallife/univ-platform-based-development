import { ModuleMetadata, Type } from '@nestjs/common';

export interface S3Options {
  apiVersion: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface S3OptionsFactory {
  createMailerOptions(): Promise<S3Options> | S3Options;
}

export interface S3AsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<S3OptionsFactory>;
  injet?: any[];
}
