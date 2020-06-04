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
}