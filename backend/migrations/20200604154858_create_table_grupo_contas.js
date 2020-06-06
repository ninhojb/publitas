exports.up = function (knex) {
    return knex.schema.createTable('grupo_contas', table => {
        table.increments('id').primary()
        table.string('descricao').unique().notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('grupo_contas')
};
