const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const BlogCategoriaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoria: String,
    cor: String,
    especialidade: []
});

module.exports = BlogCategoriaSchema;