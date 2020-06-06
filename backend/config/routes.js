const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/formapagamento')
        .all(app.config.passport.authenticate())
        .get(app.api.formapagamentos.get)
        .post(admin(app.api.formapagamentos.save))

    app.route('/formapagamento/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.formapagamentos.save))
        .get(app.api.formapagamentos.getById)
        .delete(admin(app.api.formapagamentos.remove))

    app.route('/fornecedor')
        .all(app.config.passport.authenticate())
        .get(app.api.fornecedor.get)
        .post(admin(app.api.fornecedor.save))

    app.route('/fornecedor/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.fornecedor.save))
        .get(app.api.fornecedor.getById)
        .delete(admin(app.api.fornecedor.remove))

    app.route('/empresa')
        .all(app.config.passport.authenticate())
        .get(app.api.empresa.get)
        .post(admin(app.api.empresa.save))

    app.route('/empresa/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.empresa.save))
        .get(app.api.empresa.getById)
        .delete(admin(app.api.empresa.remove))

    app.route('/grupocontas')
        .all(app.config.passport.authenticate())
        .get(app.api.grupo_contas.get)
        .post(admin(app.api.grupo_contas.save))

    app.route('/grupocontas/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.grupo_contas.save))
        .get(app.api.grupo_contas.getById)
        .delete(admin(app.api.grupo_contas.remove))

    app.route('/despesas')
        .all(app.config.passport.authenticate())
        .get(app.api.despesas.get)
        .post(admin(app.api.despesas.save))

    app.route('/despesas/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.despesas.save))
        .get(app.api.despesas.getById)
        .delete(admin(app.api.despesas.remove))

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}