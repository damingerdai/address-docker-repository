import * as config from '../knexfile';
import Knex from 'knex';

const { connection: { database } } = config as any;

delete (config as any).connection.database;

const knex = Knex(config);

knex.raw(`DROP DATABASE ${database}`).finally(() => knex.destroy())