const mongoose = require('mongoose');
const BlogCategoriaSchema = require('../../models/blogCategoria');
const categoriaModel = mongoose.model('Categoria',BlogCategoriaSchema);
var categoria = new categoriaModel;

module.exports.cadastroCategoria = (app, req, res) => {
    
}