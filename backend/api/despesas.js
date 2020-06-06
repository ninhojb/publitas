module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const despesas = { ...req.body }
        if (req.params.id) despesas.id = req.params.id

        try {
            existsOrError(despesas.data_lancamento, 'data_lancamento não informado')
            existsOrError(despesas.vencimento, 'Novencimento não informado')
            existsOrError(despesas.numero_nota, 'numero da nota não informado')
            existsOrError(despesas.valor, 'valor não informado')
            existsOrError(despesas.id_fornecedor, 'Codigo fornecedor não informado')
            existsOrError(despesas.id_form_pag, 'Codigo pagamento não informado')
            existsOrError(despesas.id_grupo_contas, 'Codigo contas não informado')
            existsOrError(despesas.id_empresa, 'Codigo empresa não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (despesas.id) {
            app.db('despesas')
                .update(despesas)
                .where({ id: despesas.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('despesas')
                .insert(despesas)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('despesas')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Codigo do despesa não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    // const get = (req, res) => {
    //     app.db('raw.despesas')
    //         .then(despesa => res.json(despesa))
    //         .catch(err => res.status(500).send(err))
    // }
    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('despesas').count('id').first()
        const count = parseInt(result.count)

        app.db('despesas')
            // .select('id', 'data_lancamento', 'vencimento','numero_nota',
            // 'complemento','valor','data_pagamento')
            .limit(limit).offset(page * limit - limit)
            .then(despesa => res.json({ data: despesa, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db({d: 'despesas', f: 'fornecedor', 
                e: 'empresa', g: 'grupo_contas', 
                for: 'formapagamento'})
                
            .select('d.id', 'd.data_lancamento', 'd.vencimento','d.numero_nota',
                    'd.complemento','d.valor','d.data_pagamento', 
                    {fornecedor : 'f.nome'}, 
                    {empresa :'e.nome'}, 
                    {grupo_contas: 'g.descricao'}, 
                    {forma_pagamento: 'for.descricao'})

            .where({ 'd.id': req.params.id })
            .whereRaw('?? = ??', ['d.id_fornecedor', 'f.id'])
            .whereRaw('?? = ??', ['d.id_empresa', 'e.id'])
            .whereRaw('?? = ??', ['d.id_grupo_contas', 'g.id'])
            .whereRaw('?? = ??', ['d.id_form_pag', 'for.id'])
            .first()
            .then(despesa => res.json(despesa))
    }

    return { save, remove, get, getById }
}