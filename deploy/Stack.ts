import * as cdk from 'aws-cdk-lib';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Code, Function, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import 'dotenv/config';

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const PG_USER = process.env.PG_USER ?? '';
    const PG_PASSWORD = process.env.PG_PASSWORD ?? '';
    const PG_HOST = process.env.PG_HOST ?? '';
    const PG_PORT = Number(process.env.PG_PORT) ?? 5432;
    const PG_DB = process.env.PG_DB ?? '';
    const DATABASE_URL = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`;

    // not worked - need add ssl library, using case bellow
    // const cartApiHandler = new nodejs.NodejsFunction(this, 'CartApiLambda', {
    //   functionName: 'nodejs-aws-cart-api',
    //   entry: 'dist/handlers/cart.js',
    //   timeout: cdk.Duration.seconds(30),
    //   memorySize: 1024,
    //   runtime: lambda.Runtime.NODEJS_20_X,
    //   environment: {
    //     DATABASE_URL,
    //   },
    // });

    // const vpc = Vpc.fromLookup(this, 'DefaultVpc', {
    //   isDefault: true,
    // });

    // const securityGroups = [
    //   new SecurityGroup(this, 'PostgresSecurityGroup', {
    //     vpc: vpc,
    //   }),
    // ];

    const cartApiHandler = new Function(this, 'CartHandler', {
      functionName: 'nodejs-aws-cart-api',
      code: Code.fromAsset('dist/handlers/cart'),
      handler: 'cart.handler',
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        DATABASE_URL,
      },
      // for case using API gate need add:
      // vpc,
      // vpcSubnets: {
      //   // subnets: vpc.publicSubnets,
      //   availabilityZones: ['us-east-1a'],
      // },
      // securityGroups,
      allowPublicSubnet: true,
    });

    const api = new RestApi(this, 'CartServiceApi');
    const root = api.root.addResource('{proxy+}');
    root.addMethod('ANY', new LambdaIntegration(cartApiHandler));
    root.addCorsPreflight({
      allowOrigins: Cors.ALL_ORIGINS,
      allowHeaders: Cors.DEFAULT_HEADERS,
      allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT'],
    });

    new cdk.CfnOutput(this, 'Url', { value: api.url });
  }
}
