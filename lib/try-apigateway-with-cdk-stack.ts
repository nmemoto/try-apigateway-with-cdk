import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda-go-alpha'

export class TryApigatewayWithCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const backend = new lambda.GoFunction(this, 'handler', {
      entry: 'lambda/hello',
    });

    const api = new apigateway.LambdaRestApi(this, 'myapi', {
      handler: backend,
      proxy: false,
      deployOptions: {
        metricsEnabled: true
      }
    });

    const hello1 = api.root.addResource('hello1');
    hello1.addMethod('GET');

    const hello2 = api.root.addResource('hello2');
    hello2.addMethod('GET');

    const hello3 = api.root.addResource('hello3');
    hello3.addMethod('GET');
  }
}
