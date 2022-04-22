import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // use the Bucket construct
    const bucket = new s3.Bucket(this, 'cdk-bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // use the Table construct
    const table = new dynamodb.Table(this, 'todos-table', {
      partitionKey: {name: 'Id', type: dynamodb.AttributeType.NUMBER},
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new cdk.CfnOutput(this, 'bucketName', {
      value: bucket.bucketName,
    });
    new cdk.CfnOutput(this, 'tableName', {value: table.tableName});

  }
}

