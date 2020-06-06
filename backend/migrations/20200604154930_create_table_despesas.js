
exports.up = function(knex) {
    return knex.schema.createTable('despesas', table => {
        table.increments('id').primary()
        table.date('data_lancamento').notNull()
        table.date('vencimento').notNull()
        table.integer('numero_nota').notNull()
        table.string('complemento')
        table.float('valor').notNull()
        table.date('data_pagamento')
        table.integer('id_fornecedor').references('id')
            .inTable('fornecedor').notNull()
        table.integer('id_form_pag').references('id')
            .inTable('formapagamento').notNull()
        table.integer('id_grupo_contas').references('id')
            .inTable('grupo_contas').notNull()
        table.integer('id_empresa').references('id')
            .inTable('empresa').notNull()
    })
  };

exports.down = function(knex) {
    return knex.schema.dropTable('despesas')
};
