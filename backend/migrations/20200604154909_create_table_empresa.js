exports.up = function (knex) {
    return knex.schema.createTable('raw.empresa', table => {
        table.increments('id').primary()
        table.string('nome')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('raw.empresa')
};
