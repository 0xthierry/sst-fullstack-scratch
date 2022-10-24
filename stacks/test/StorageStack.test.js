import { App, getStack } from "@serverless-stack/resources";
import { StorageStack } from "../StorageStack";
import { test } from "vitest";
import { Template } from "aws-cdk-lib/assertions";

test("should use billing mode pay_per_request", () => {
  const app = new App();

  app.stack(StorageStack);

  const template = Template.fromStack(getStack(StorageStack));

  template.hasResourceProperties("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
  });
});
