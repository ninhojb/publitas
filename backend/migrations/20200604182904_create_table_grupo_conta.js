

exports.up = function (knex) {
    return knex.schema.createTable('raw.grupo-contas', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('raw.grupo_contas')
};