module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const grupo = { ...req.body }
        if (req.params.id) grupo.id = req.params.id

        try {
            existsOrError(grupo.descricao, 'Descricao não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (grupo.id) {
            app.db('raw.grupo_contas')
                .update(grupo)
                .where({ id: grupo.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('raw.grupo_contas')
                .insert(grupo)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('raw.grupo_contas')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Codigo do grupo não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    const get = (req, res) => {
        app.db('raw.grupo_contas')
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('raw.grupo_contas')
            .where({ id: req.params.id })
            .first()
            .then(forma => res.json(forma))
    }

    return { save, remove, get, getById }
}