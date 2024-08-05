import serverlessExpress from '@codegenie/serverless-express';

import { Callback, Context, Handler } from 'aws-lambda';
import { bootstrap } from '../bootstrap';

let server: Handler;

async function bootstrapServerLess() {
  const app = await bootstrap();
  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

export const handler: Handler = async (
  event: unknown,
  context: Context,
  callback: Callback,
) => {
  if (!server) {
    server = await bootstrapServerLess();
  }

  console.log('DATABASE_URL', process.env.DATABASE_URL);

  return server(event, context, callback);
};
