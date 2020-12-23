#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkTodoBackendStack } from '../lib/cdk-todo-backend-stack';

const app = new cdk.App();
new CdkTodoBackendStack(app, 'CdkTodoBackendStack');
