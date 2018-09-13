const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const BlogComentario = require('./blogComentario');

const BlogEspecialidadeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: String,
    criado_por: String,
    cadastrado_em: { type: Date, default: Date.now },
    requisitos: String,
    comentarios: [BlogComentario]
});

module.exports = BlogEspecialidadeSchema;