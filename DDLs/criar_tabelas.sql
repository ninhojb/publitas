CREATE SCHEMA IF NOT EXISTS raw AUTHORIZATION publitas;

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
	CONSTRAINT pk_id_forncedor PRIMARY KEY (id_fornecedor)

);

CREATE TABLE IF NOT EXISTS raw.formapagamento(
	id_form_pag bigint NOT NULL,
	descricao varchar(20),
	CONSTRAINT pk_id_from_pag PRIMARY KEY (id_form_pag)

);

CREATE TABLE IF NOT EXISTS raw.empresa(
	id_empresa bigint NOT NULL,
	descricao varchar(50) NOT NULL,
	CONSTRAINT pk_id_empresa PRIMARY KEY (id_empresa)

);
CREATE TABLE raw.grupo_contas(
	id_grupo_contas bigint NOT NULL,
	descricao varchar(100) NOT NULL,
	CONSTRAINT pk_pk_grupo_contas PRIMARY KEY (id_grupo_contas)

);

CREATE TABLE IF NOT EXISTS raw.despesa(
	id_despesa bigint NOT NULL,
	id_fornecedor bigint NOT NULL,
	id_form_pag bigint NOT NULL,
	id_empresa bigint NOT NULL,
	data_lancamento date NOT NULL DEFAULT CURRENT_TIMESTAMP,,
	vencimento date NOT NULL,
	numero_nota bigint NOT NULL,
	grupo_contas_contabil bigint NOT NULL,
	complemento varchar(50),
	valor float NOT NULL,
	data_pagamento date,
	CONSTRAINT pk_id_despesa PRIMARY KEY (id_despesa)

);