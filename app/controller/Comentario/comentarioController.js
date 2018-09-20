const mongoose = require('mongoose');
const BlogComentario = require('../../models/blogComentario');
const BlogEspecialidadeSchema = require('../../models/blogEspecialidade');
const UsuarioSchema           = require('../../models/usuarioModel');

const comentarioModel = mongoose.model('Comentario',BlogComentario);
const usuarioModel  = mongoose.model('Desbravadores', UsuarioSchema);
const especialidadeModel = mongoose.model('Especialidade', BlogEspecialidadeSchema);

comentario = new comentarioModel;

module.exports.inserirComentario = (app, req, res) => {
    let comentario_body = req.body.comentario;
    let id_usuario = req.body.id_usuario;
    let id_especialidade = req.body.id_especialidade;

    comentario._id   = new mongoose.Types.ObjectId;
    comentario.texto = comentario_body;

    usuarioModel.findById(id_usuario)
        .then(result => {
        
           let usuario = {
                _id: result._id,
                nome: result.nome,
                sobrenome: result.sobrenome,
                clube: result.clube,
                unidade: result.unidade,
                foto_perfil: result.foto_perfil
            };

            especialidadeModel.findById(id_especialidade)
                .then(resultEspeci => {
                    
                    let especialidade = {
                        _id: resultEspeci._id,
                        titulo: resultEspeci.titulo,
                    };

                    comentario.usuario = usuario;
                    comentario.especialidade = especialidade;

                    comentario.save()
                        .then(resultado => {
                            
                            let comentario = {
                                _id: resultado._id,
                                texto: resultado.texto,
                                usuario: resultado.usuario
                            };

                            especialidadeModel.update({_id: id_especialidade},{$set: { comentarios: [comentario] }})
                                .then(result => {
                                    especialidadeModel.findById(id_especialidade)
                                        .then(resultatdoEspeciUp => res.status(200).json(resultatdoEspeciUp) )
                                        .catch(error => res.status(500).json(error) );
                                }).catch(error => res.status(500).json(error) );
                            
                        }).catch(error => res.status(500).json(error) );
                })
                .catch(error => res.status(500).json(error) );

        })
        .catch(error => res.status(500).json(error) );

}; 

// ======================================= Fim de Cadastrar Comentario ===============================

module.exports.excluirComentario = (app, req, res) => {
    let id_comentario =  req.params.id_comentario;
    let id_especialidade = req.body.id_especialidade;

    especialidadeModel.update({_id: id_especialidade}, {$pull: { 'comentarios': {'_id': id_comentario } } } )
        .then(resutado => {
            if(resutado){
                especialidadeModel.findById(id_especialidade)
                    .then(resultado => {
                        res.status(200).json(resultado);
                    }).catch(error => res.status(500).json(error) )
            }
        })
        .catch( error => res.status(500).json(error) );
    /*comentarioModel.remove({ _id: id_comentario })
        .exec()
        .then(result => {
            especialidadeModel.update({_id: id_especialidade}, {$pull: { 'comentarios': {'_id': id_comentario } } } );
        }).catch(error => res.status(500).json(error) ); */
};