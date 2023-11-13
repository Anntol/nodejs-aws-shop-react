import * as cdk from "aws-cdk-lib";
import { CdkStack } from "./cdk-stack.js";

const app = new cdk.App();
new CdkStack(app, "CdkStack", {});
