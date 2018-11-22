const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const BlogEspecialidadeSchema = require('./blogEspecialidade');

const BlogCategoriaSchema = new Schema({
    categoria: String,
    cor: String,
    especialidade: [BlogEspecialidadeSchema]
}, { safe: true });

module.exports = BlogCategoriaSchema;
