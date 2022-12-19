import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Options, S3OptionsFactory } from 'src/s3';

@Injectable()
export class S3Configuration implements S3OptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): S3Options | Promise<S3Options> {
    return {
      apiVersion: this.configService.get<string>(''),
      accessKeyId: this.configService.get<string>(''),
      secretAccessKey: this.configService.get<string>(''),
      region: this.configService.get<string>(''),
    };
  }
}
