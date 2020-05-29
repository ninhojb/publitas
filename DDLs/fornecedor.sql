CREATE TABLE IF NOT EXISTS raw.fornecedor(
    id_fornecedor bigint NOT NULL,
    cpf_cnpj integer NOT NULL,
	nome varchar(250) NOT NULL,
	inscriacao_estadual varchar(15),
	inscricao_municipal varchar(20),
	endereco varchar(100),
	numero integer,
	telefone varchar(15),
	email varchar(50),
	CONSTRAINT id_forncedor_pk PRIMARY KEY (id_fornecedor)

);

CREATE TABLE IF NOT EXISTS raw.formapagamento(
	id_form_pag bigint NOT NULL,
	descricao varchar(20),
	CONSTRAINT id_from_pag_pk PRIMARY KEY (id_form_pag)

);

CREATE TABLE IF NOT EXISTS raw.empresa(
	id_empresa bigint NOT NULL,
	descricao varchar(50) NOT NULL,
	CONSTRAINT id_empresa_pk PRIMARY KEY (id_empresa)

);
CREATE TABLE IF NOT EXISTS raw.despesa(
	id_despesa bigint NOT NULL,
	id_fornecedor bigint NOT NULL,
	id_form_pag bigint NOT NULL,
	id_empresa bigint NOT NULL,
	data_lancamento date NOT NULL DEFAULT current date,
	vencimento date NOT NULL,
	numero_nota bigint NOT NULL,
	grupo_contas_contabil bigint NOT NULL,
	complemento varchar(50),
	valor float NOT NULL,
	data_pagamento date,
	CONSTRAINT id_despesa_pk PRIMARY KEY (id_despesa)

);