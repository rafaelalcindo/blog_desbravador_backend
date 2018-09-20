const mongoose = require('mongoose');
const BlogEspecialidadeSchema = require('../../models/blogEspecialidade');
const BlogCategoriaSchema     = require('../../models/blogCategoria');

const especialidadeModel = mongoose.model('Especialidade', BlogEspecialidadeSchema);
const categoriaModel     = mongoose.model('Categoria',BlogCategoriaSchema);

var especialidade = new especialidadeModel;

const crypApelido = 'aes-256-ctr';
// ================= Arquivo de Biblioteca ==============
var crypto = require('crypto');
var fs     = require('fs');

module.exports.cadastrarEspecialidade = (app, req, res) => {
    const id_categoria = req.body.id_categoria;

    especialidade._id                = new mongoose.Types.ObjectId;
    especialidade.titulo             = req.body.titulo;
    especialidade.criado_por         = req.body.criado_por;
    especialidade.requisitos         = req.body.requisitos;

    //especialidade.foto_especialidade = req.body.foto_especialidade;

    verificaExtencaoDoArquivo(req.files.foto_especialidade)
        .then(() => { }).catch(error => res.status(500).json(error) );

    let resu_foto_especi = UploadingFotoEspecialidade(req.files.foto_especialidade, req.body.titulo)

    especialidade.foto_especialidade = resu_foto_especi;
    
    especialidade.save()
        .then(resposta => {
            categoriaModel.update({'_id': id_categoria}, { $set : { especialidade: [resposta] } })
                .then(categoriaResposta => {
                    res.status(200).json(categoriaResposta);
                })
                .catch(error => res.status(500).json(error) )
        })
        .catch(error => res.status(500).json(error) )
    
}

module.exports.pegarEspecialidadeIndividual = (app, req, res) => {
    const id = req.params.id;

    especialidadeModel.findById(id)
        .then(resultado => {
            res.status(200).json(resultado)
        })
        .catch(error => res.status(500).json(error) )
}

module.exports.atualizarEspecialidade = (app, req, res) => {
    const id = req.params.id;
    let body = req.body;

    especialidadeModel.update({ _id: id}, body)
        .then( (resultado) => {
            especialidadeModel.findById(id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(error => res.status(500).json(error) )
        })
        .catch(error => res.status(500).json(error) )
}



// ============================= Funções complementares ===========================

// =============== Uploads Images ===============

function verificaExtencaoDoArquivo(nomeArquivo) {
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

function UploadingFotoEspecialidade(file, titulo) {
    let dir = "app/assets/file_especialidade/"+criptografarArquivo(crypto, titulo);
    try {
        fs.mkdir(dir);
        if(file){
            file.mv(dir+"/"+file.name);
            dir = dir+"/"+file.name;
        }else { throw e }
        return dir;
    }catch(e) {
        return null
    }
}

// ================ Criptografias =================


function criptografarArquivo(texto, arquivo) {
    let cipher  = crypto.createCipher(texto, arquivo);
    let crypted = cipher.update(texto, 'utf8','hex');
    crypted += cipher.final('hex');
    return crypted; 
}

function descriptografarArquivo(texto, arquivo) {
    let decipher = crypto.createCipher(texto, arquivo);
    let dec    = decipher.update(texto, 'hex', 'utf8');
    dec       += decipher.final('utf8');
    return dec;
}