export type S3Request = {
  Bucket: string;
  ACL?: string;
  Key: string;
  Body: string;
  ContentType: string;
};

export type S3CreateBucketRequest = {
  name: string;
};
