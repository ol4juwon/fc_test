/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'concher_admin',
      password: 'concher1234',
      database: 'foodcourt',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'concher_admin',
      password: 'concher1234',
      database: 'foodcourt',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'ola',
      password: 'concheradmin',
      database: 'foodcourt',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
