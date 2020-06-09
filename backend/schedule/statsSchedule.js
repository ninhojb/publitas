const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const despesasCount = await app.db('despesas').count('id').first()
        const empresaCount = await app.db('empresa').count('id').first()
        const grupo_contasCount = await app.db('grupo_contas').count('id').first()
        const formapagamentoCount = await app.db('formapagamento').count('id').first()
        const fornecedorCount = await app.db('fornecedor').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            despesas: despesasCount.count,
            fornecedor: fornecedorCount.count,
            empresa: empresaCount.count,
            grupo_contas: grupo_contasCount.count,
            formaPagamento: formapagamentoCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeDespesas = !lastStat || stat.despesas !== lastStat.despesas
        const changeFornecedor = !lastStat || stat.fornecedor !== lastStat.fornecedor
        const changeEmpresa = !lastStat || stat.empresa !== lastStat.empresa
        const changeGrupo_contas = !lastStat || stat.grupo_contas !== lastStat.grupo_contas
        const changeFormaPagamento = !lastStat || stat.formaPagamento !== lastStat.formaPagamento

        if(changeUsers || changeDespesas || changeFornecedor || 
            changeEmpresa || changeGrupo_contas || changeFormaPagamento) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}