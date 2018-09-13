const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const BlogEspecialidadeSchema = require('./blogEspecialidade');

const BlogCategoriaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoria: String,
    cor: String,
    especialidade: [BlogEspecialidadeSchema]
});

module.exports = BlogCategoriaSchema;