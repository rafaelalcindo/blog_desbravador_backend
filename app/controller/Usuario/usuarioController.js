const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const UsuarioSchema = require('../../models/usuarioModel');
const usuarioModel  = mongoose.model('Desbravadores', UsuarioSchema);
var usuario = new usuarioModel;

const crypApelido = 'aes-256-ctr';
// ====== Arquivos de Biblioteca ======

var crypto  = require('crypto');
var fs      = require('fs');

module.exports.cadastroDesbravadorMongo = (app, req, res) => {

    usuario._id         = new mongoose.Types.ObjectId;
    usuario.nome        = req.body.nome;
    usuario.sobrenome   = req.body.sobrenome;
    usuario.login       = req.body.login;
    usuario.senha       = criptografarArquivo(crypApelido,req.body.senha)  ;
    usuario.privilegio  = 1;
    usuario.descricao   = req.body.descricao;
    usuario.clube       = req.body.clube;
    usuario.unidade     = req.body.unidade;
    //usuario.foto_perfil = req.body.foto_perfil;

    verificaExtencaoDoArquivo(req.files.foto_perfil)
        .then(() => { }).catch(() => res.status(500).json({'error':'arquivo não permitido' }) );

    let resu_foto_perfil = UploadFotoPerfil(req.files.foto_perfil, req.body.login);
    usuario.foto_perfil = resu_foto_perfil;

    //console.log('Desbravador: ', usuario);
    usuario.save()
        .then((user) => res.status(200).json(user) )
        .catch( err => res.status(500).json(err) );
}

module.exports.logarUsuario = (app, req, res) => {
    let login  = req.body.login;
    let senha  = req.body.senha;

    usuarioModel.find({ login: login, senha: senha })
        .then(resposta => {
            //res.status(200).json(resposta) 
            let token = jwt.sign({data: resposta},'secret' );
            res.status(200).json(token);
        } )
        .catch(err => res.status(500).json(err) )
}

module.exports.pegarDadosUsuario = (app, req, res) => {
    let id = req.params.id;

    usuarioModel.findById(id)
        .then(resposta => res.status(200).json(resposta) )
        .catch( err => res.status(500).json(err) )
}

module.exports.atualizarDadosUsuario = (app, req, res) => {
    const id = req.params.id;
    const corpo = req.body;

    usuarioModel.update({ _id: id }, corpo)
        .then(() => {
            usuarioModel.findById(id)
                .then(resultado => res.status(201).json(resultado) )
        })
        .catch(err => res.status(500).json(err) )
}


module.exports.atualizarFotoPerfil = (app, req, res) => {
    const id = req.params.id;
    
    verificaExtencaoDoArquivo(req.files.foto_perfil)
        .then(()=>{ }).catch(() => res.status(500).json({'error':'arquivo não permitido' }) )

    usuarioModel.findById(id)
        .then(resultado => {
            let dir = resultado.foto_perfil;
            fs.unlink(dir);
            let resu_foto_upload = UploadFotoPerfil(req.files.foto_perfil, req.body.login);
            usuarioModel.update({_id: id}, { $set: { 'foto_perfil': resu_foto_upload } })
                .exec().then(resulUp => {
                    if(resulUp){
                        usuarioModel.findById(id).then(resu => res.status(200).json(resu))
                        .catch(error => res.status(500).json(error) )
                    }
                }).catch(error => res.status(500).json(error) )
        }).catch(error => res.status(500).json(error) )
}

// ============================== Privilégios Administrativo ===============================


module.exports.mudarPrivilegios = (app, req, res) => {
    const id_usuario = req.params.id;
    const privilegio = req.body.privilegio;

    usuarioModel.update({ _id: id_usuario }, { $set: { privilegio: privilegio } })
        .then(resultUpdate => {
            if(resultUpdate.ok){
                usuarioModel.findById(id_usuario)
                    .then(resultado => {
                        res.status(200).json(resultado);
                    }).catch(error => { res.status(500).json(error) })
            }
        }).catch(error => res.status(500).json(error) )
}





// ================================= Funções Complementares ================================

// ============= Upload Images ========================

function verificaExtencaoDoArquivo(nomeArquivo){
    return new Promise((resolve, reject) => {
        let arrayExtencao = ['.jpg','.png'];
        let i = nomeArquivo.name.lastIndexOf('.');
        let extencao = nomeArquivo.name.substr(i);
        arrayExtencao.filter(filter => {
            if(filter === extencao){
                resolve();
            } 
        });
        reject();
    });
}

function UploadFotoPerfil(file, email) {
    let dir = "app/assets/file_users"+criptografarArquivo(crypApelido, email);
    try {
        fs.mkdirSync(dir);
        if(file){
            file.mv(dir+"/"+file.name);
            dir = dir+"/"+file.name;
        } else { throw e }
        return dir;
    }catch(e){
        return null
    }
}




// ============================== Criptografar arquivo =========================

function criptografarArquivo(texto, arquivo){
    let cipher  = crypto.createCipher(texto, arquivo);
    let crypted = cipher.update(texto,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function descriptografarArquivo(texto, arquivo) {
    let decipher = crypto.createCipher(texto, arquivo);
    let dec      = cipher.update(texto,'hex','utf8');
    dec         += decipher.final('utf8');
    return dec;
}