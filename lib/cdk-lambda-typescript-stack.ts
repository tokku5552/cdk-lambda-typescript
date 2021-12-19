import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, AssetCode } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkLambdaTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Function(this, 'HelloWorld', {
      functionName: 'HelloWorld',
      handler: "handler.handler",
      runtime: Runtime.NODEJS_14_X,
      code: new AssetCode(`./src`),
      memorySize: 512,
      timeout: Duration.seconds(10),
    });
  }
}
