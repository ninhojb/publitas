module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        despesas: Number,
        empresa: Number,
        grupo_contas: Number,
        formaPagamento: Number,
        fornecedor: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    despesas: 0,
                    empresa: 0,
                    grupo_contas: 0,
                    formaPagamento: 0,
                    fornecedor: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}