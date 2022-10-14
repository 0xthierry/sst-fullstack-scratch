import * as iam from "aws-cdk-lib/aws-iam";
import { use, Cognito } from "@serverless-stack/resources";

import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

export function AuthStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const auth = new Cognito(stack, "auth", {
    login: ["email"],
    /* cdk: {
      userPool: {
        passwordPolicy: {
          minLength: 8,
          requireDigits: true,
          requireUppercase: true,
          requireSymbols: true,
          requireLowercase: true
        }
      }
    } */
  });

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazon.com:sub}/*",
      ],
    }),
  ]);

  stack.addOutputs({
    region: app.region,
    userPoolId: auth.userPoolId,
    identityPoolId: auth.cognitoIdentityPoolId,
    userPoolClientId: auth.userPoolClientId,
  });

  return {
    auth,
  };
}
