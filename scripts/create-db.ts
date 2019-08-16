import * as config from '../knexfile';
import Knex from 'knex';

const { connection: { database } } = config as any;

delete (config as any).connection.database;

const knex = Knex(config);

knex.raw(`CREATE DATABASE ${database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`).finally(() => knex.destroy())