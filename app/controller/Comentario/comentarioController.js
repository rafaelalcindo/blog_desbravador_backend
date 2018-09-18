const mongoose = require('mongoose');
const BlogComentario = require('../../models/blogComentario');
const BlogEspecialidadeSchema = require('../../models/blogEspecialidade');
const UsuarioSchema           = require('../../models/usuarioModel');

const comentarioModel = mongoose.model('Comentario',BlogComentario);
const usuarioModel  = mongoose.model('Desbravadores', UsuarioSchema);
const especialidadeModel = mongoose.model('Especialidade', BlogEspecialidadeSchema);

comentario = new comentarioModel;

module.exports.inserirComentario = (app, req, res) => {
    let comentario = req.body.comentario;
    let id_usuario = req.body.id_usuario;
    let id_especialidade = req.body.id_especialidade;

    comentario.texto = comentario;

    usuarioModel.findById(id_usuario)
        .then(result => {
        
           let usuario = {
                _id: result._id,
                nome: result.nome,
                sobrenome: result.sobrenome,
                clube: result.clube,
                unidade: result.unidade,
                foto_perfil: result.foto_perfil
            }

            console.log('Usuario: ', usuario);

        })

}