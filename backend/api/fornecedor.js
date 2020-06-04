module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const fornecedor = { ...req.body }
        if (req.params.id) fornecedor.id = req.params.id

        try {
            existsOrError(fornecedor.cpf_cnpj, 'cpf_cnpj não informado')
            existsOrError(fornecedor.nome, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (fornecedor.id) {
            app.db('raw.fornecedor')
                .update(fornecedor)
                .where({ id: fornecedor.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('raw.fornecedor')
                .insert(fornecedor)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('raw.fornecedor')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Codigo do Forncedor não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    const get = (req, res) => {
        app.db('raw.fornecedor')
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('raw.fornecedor')
            .where({ id: req.params.id })
            .first()
            .then(forma => res.json(forma))
    }

    return { save, remove, get, getById }
}