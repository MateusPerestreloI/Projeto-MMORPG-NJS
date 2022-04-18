module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login')
    }

    var msg = ''
    if (req.query.msg != '') {
        msg = req.query.msg
    }

    var usuario = req.session.usuario
    var casa = req.session.casa

    var connection = application.config.dbConnection
    var JogoDAO = new application.app.models.JogoDAO(connection)

    parametros = JogoDAO.iniciarjogo(usuario, res, casa, msg)
}

module.exports.sair = function (application, req, res) {

    req.session.destroy(function (err) {
        res.render('index', { validacao: {} })
    })
}

module.exports.suditos = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login')
    }

    res.render('aldeoes', { validacao: {} })
}

module.exports.pergaminhos = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login')
    }

    res.render('pergaminhos', { validacao: {} })
}

module.exports.ordenar_acao_sudito = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login')
    }

    var dadosForm = req.body

    req.assert('acao', 'Ação deve ser informado').notEmpty()
    req.assert('quantidade', 'Quantidade deve ser informado').notEmpty()

    var erros = req.validationErrors()
    
    if (erros) {
        res.redirect('jogo?msg=A')
        return
    }

    var connection = application.config.dbConnection
    var JogoDAO = new application.app.models.JogoDAO(connection)

    dadosForm.usuario = req.session.usuario
    JogoDAO.acao(dadosForm)

    res.redirect('jogo?msg=B')
}