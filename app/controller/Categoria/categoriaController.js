const mongoose = require('mongoose');
const BlogCategoriaSchema = require('../../models/blogCategoria');
const categoriaModel = mongoose.model('Categoria',BlogCategoriaSchema);
var categoria = new categoriaModel;

module.exports.cadastroCategoria = (app, req, res) => {
    categoria._id       = new mongoose.Types.ObjectId;
    categoria.categoria = req.body.categoria;
    categoria.cor       = req.body.cor;

    categoria.save()
        .then(resultado => res.status(200).json(resultado) )    
        .catch(erro => res.status(500).json(erro) )
}

module.exports.atualizarCategoria = (app, req, res) => {
    const id   = req.params.id;
    const body = req.body;

    categoriaModel.update({ _id: id },body)
        .then(() => {
            categoriaModel.findById(id)
                .then(resultado => res.status(200).json(resultado) );
        })
        .catch(error => res.status(500).json(error) )
}

module.exports.listarTodasCategorias = (app, req, res) => {
    
    categoriaModel.find()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch( error => res.status(500).json(error) )

}

module.exports.listarUmaCategoria = (app, req, res) => {
    const id  = req.params.id;

    categoriaModel.findById(id)
        .then(resposta => res.status(200).json(resposta) )
        .catch( error => res.status(500).json(error) )
}

