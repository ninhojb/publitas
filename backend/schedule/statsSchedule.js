const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const despesasCount = await app.db('despesas').count('id').first()
        const fornecedorCount = await app.db('fornecedor').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            despesas: despesasCount.count,
            fornecedor: fornecedorCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeDespesas = !lastStat || stat.despesas !== lastStat.despesas
        const changeFornecedor = !lastStat || stat.fornecedor !== lastStat.fornecedor

        if(changeUsers || changeDespesas || changeFornecedor) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}