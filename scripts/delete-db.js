'use strict';

const config = require('../knexfile');

const { connection: { database } } = config;
delete config.connection.database;

const knex = require('knex')(config);

knex.raw(`DROP DATABASE ${database}`).finally(() => knex.destroy())