import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, AssetCode } from 'aws-cdk-lib/aws-lambda';
import { aws_s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class CdkLambdaTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new aws_s3.Bucket(this, 'FunctionStore');

    const lambdaPolicy = new PolicyStatement();
    lambdaPolicy.addActions("s3:ListBucket");
    lambdaPolicy.addResources(bucket.bucketArn);

    const lambdaFunction = new Function(this, 'HelloWorld', {
      functionName: 'HelloWorld',
      handler: "handler.handler",
      runtime: Runtime.NODEJS_14_X,
      code: new AssetCode(`./src`),
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        bucket: bucket.bucketName,
      },
      initialPolicy: [lambdaPolicy],
    });
  }
}
