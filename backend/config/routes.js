module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        // .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/formapagamento')
        // .all(app.config.passport.authenticate())
        .get(app.api.formapagamentos.get)
        .post(app.api.formapagamentos.save)

    app.route('/formapagamento/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.formapagamentos.save)
        .get(app.api.formapagamentos.getById)
        .delete(app.api.formapagamentos.remove)

    app.route('/fornecedor')
        // .all(app.config.passport.authenticate())
        .get(app.api.fornecedor.get)
        .post(app.api.fornecedor.save)

    app.route('/fornecedor/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.fornecedor.save)
        .get(app.api.fornecedor.getById)
        .delete(app.api.fornecedor.remove)

    app.route('/empresa')
        // .all(app.config.passport.authenticate())
        .get(app.api.empresa.get)
        .post(app.api.empresa.save)

    app.route('/empresa/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.empresa.save)
        .get(app.api.empresa.getById)
        .delete(app.api.empresa.remove)

    app.route('/grupocontas')
        // .all(app.config.passport.authenticate())
        .get(app.api.grupo_contas.get)
        .post(app.api.empresa.save)

    app.route('/grupocontas/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.grupo_contas.save)
        .get(app.api.grupo_contas.getById)
        .delete(app.api.grupo_contas.remove)
}