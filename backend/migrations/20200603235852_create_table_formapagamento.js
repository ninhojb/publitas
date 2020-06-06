
exports.up = function(knex) {
    return knex.schema.createTable('formapagamento', table => {
        table.increments('id').primary()
        table.string('descricao').unique().notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('formapagamento')
};
