exports.up = function (knex) {
    return knex.schema.createTable('empresa', table => {
        table.increments('id').primary()
        table.string('nome').unique().notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('empresa')
};
