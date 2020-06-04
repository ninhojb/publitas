
exports.up = function(knex) {
    return knex.schema.createTable('raw.formapagamento', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
    })
};

exports.down = function(knex) {
  
};
