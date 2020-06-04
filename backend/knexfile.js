// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'publitas',
    user:     'ninhojb',
    password: 'Prudencia@2020'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
