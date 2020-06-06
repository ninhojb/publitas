
exports.up = function(knex) {
    return knex.schema.createTable('fornecedor', table => {
        table.increments('id').primary()
        table.string('cpf_cnpj').notNull().unique()
        table.string('nome').notNull()
        table.string('inscricao_estadual')
        table.string('inscricao_municipal')
        table.string('endereco')
        table.integer('numero')
        table.string('telefone')
        table.string('email')
    })
  };

exports.down = function(knex) {
    return knex.schema.dropTable('fornecedor')
};
