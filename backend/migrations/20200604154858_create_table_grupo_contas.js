exports.up = function (knex) {
    return knex.schema.createTable('raw.grupo_contas', table => {
        table.increments('id').primary()
        table.string('descricao')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('raw.grupo_contas')
};
