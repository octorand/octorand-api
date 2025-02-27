/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env';

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring blockchain indexers
  |----------------------------------------------------------
  */
  ALGO_INDEXER_URL: Env.schema.string(),
  ALGO_INDEXER_PAGE_SIZE: Env.schema.number(),

  /*
  |----------------------------------------------------------
  | Variables for third party services
  |----------------------------------------------------------
  */
  DISCORD_ENABLED: Env.schema.boolean(),
  DISCORD_TOKEN: Env.schema.string(),
  DISCORD_CHANNEL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring smart contracts
  |----------------------------------------------------------
  */
  CONTRACT_AUTH_APPLICATION_ID: Env.schema.number(),
  CONTRACT_AUTH_METHOD_SIGNATURE: Env.schema.string(),
  CONTRACT_DEPOSIT_APPLICATION_ID: Env.schema.number(),
  CONTRACT_DEPOSIT_METHOD_SIGNATURE: Env.schema.string(),
});
