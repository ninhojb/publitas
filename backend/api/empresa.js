module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const empresa = { ...req.body }
        if (req.params.id) empresa.id = req.params.id

        try {
            existsOrError(empresa.nome, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (empresa.id) {
            app.db('raw.empresa')
                .update(empresa)
                .where({ id: empresa.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('raw.empresa')
                .insert(empresa)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('raw.empresa')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Codigo do empresa não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    const get = (req, res) => {
        app.db('raw.empresa')
            .then(empresa => res.json(empresa))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('raw.empresa')
            .where({ id: req.params.id })
            .first()
            .then(forma => res.json(forma))
    }

    return { save, remove, get, getById }
}