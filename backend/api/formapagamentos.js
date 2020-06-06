module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const formPag = { ...req.body }
        if(req.params.id) formPag.id = req.params.id

        try {
            existsOrError(formPag.descricao, 'Descricao não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(formPag.id) {
            app.db('formapagamento')
                .update(formPag)
                .where({ id: formPag.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('formapagamento')
                .insert(formPag)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('formapagamento')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Forma de pagamento não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }
    const get = (req, res) => {
        app.db('formapagamento')
            .then(formaS => res.json(formaS))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('formapagamento')
            .where({ id: req.params.id })
            .first()
            .then(forma => res.json(forma))
    }

    return { save , remove ,get, getById }
}