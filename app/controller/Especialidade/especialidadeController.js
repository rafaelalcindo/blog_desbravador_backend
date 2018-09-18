const mongoose = require('mongoose');
const BlogEspecialidadeSchema = require('../../models/blogEspecialidade');
const BlogCategoriaSchema     = require('../../models/blogCategoria');
const especialidadeModel = mongoose.model('Especialidade', BlogEspecialidadeSchema);
const categoriaModel     = mongoose.model('Categoria',BlogCategoriaSchema);

var especialidade = new especialidadeModel;

module.exports.cadastrarEspecialidade = (app, req, res) => {
    const id_categoria = req.body.id_categoria;

    especialidade._id        = new mongoose.Types.ObjectId;
    especialidade.titulo     = req.body.titulo;
    especialidade.criado_por = req.body.criado_por;
    especialidade.requisitos = req.body.requisitos;

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