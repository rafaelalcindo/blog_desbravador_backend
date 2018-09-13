const mongoose = require('mongoose');
const UsuarioSchema = require('../../models/usuarioModel');
const usuarioModel  = mongoose.model('Desbravadores', UsuarioSchema);
var usuario = new usuarioModel;

module.exports.cadastroDesbravadorMongo = (app, req, res) => {
    usuario._id         = new mongoose.Types.ObjectId;
    usuario.nome        = req.body.nome;
    usuario.sobrenome   = req.body.sobrenome;
    usuario.login       = req.body.login;
    usuario.senha       = req.body.senha;
    usuario.privilegio  = 1;
    usuario.descricao   = req.body.descricao;
    usuario.clube       = req.body.clube;
    usuario.unidade     = req.body.unidade;
    usuario.foto_perfil = req.body.foto_perfil;
    //console.log('Desbravador: ', usuario);
    usuario.save()
        .then((user) => res.status(200).json(user) )
        .catch( err => res.status(500).json(err) );
}

module.exports.logarUsuario = (app, req, res) => {
    let login  = req.body.login;
    let senha  = req.body.senha;

    usuarioModel.find({ login: login, senha: senha })
        .then(resposta => res.status(200).json(resposta) )
        .catch(err => res.status(500).json(err) )
}

module.exports.pegarDadosUsuario = (app, req, res) => {
    let id = req.params.id;

    usuarioModel.findById(id)
        .then(resposta => res.status(200).json(resposta) )
        .catch( err => res.status(500).json(err) )
}