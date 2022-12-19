import { Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3_OPTIONS } from './s3.contant';
import { S3Options } from './s3.interface';
import { S3CreateBucketRequest, S3Request } from './s3.request';

@Injectable()
export class S3Service {
  private readonly client: S3;

  constructor(@Inject(S3_OPTIONS) private readonly options: S3Options) {
    this.client = new S3(this.options);
  }

  public async createBucket(request: S3CreateBucketRequest) {
    return this.client.createBucket({
      Bucket: request.name,
      CreateBucketConfiguration: {
        LocationConstraint: this.options.region,
      },
      ACL: 'public',
      ObjectLockEnabledForBucket: false,
    });
  }

  public async upload(request: S3Request) {
    return this.client
      .upload({
        Bucket: request.Bucket,
        ACL: 'public',
        Key: request.Key,
        Body: request.Body,
        ContentType: request.ContentType,
      })
      .promise();
  }
}
