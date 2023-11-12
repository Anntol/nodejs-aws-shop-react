import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

const bucketName = "anntol-cdk23";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new cdk.aws_s3.Bucket(this, "CDKBucket", {
      bucketName: bucketName,
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
    });
  }
}
