const { render } = require("../../config/server");

module.exports.index = function(application, req, res){
    res.render('index', {validacao: {}})
}

module.exports.autenticar = function(application,req,res){

    var dadosForm = req.body

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
    req.assert('senha', 'Senha não pode ser vazio').notEmpty()

    var erros = req.validationErrors()

    if(erros)
    {
        res.render('index', {validacao: erros})
        return
    }

    var connection = application.config.dbConnection
    var usuarioDao = new application.app.models.UsuarioDAO(connection)

    usuarioDao.autenticar(dadosForm, req, res)
}