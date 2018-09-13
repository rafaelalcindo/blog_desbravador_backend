const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const UsuarioSchema = require('./usuarioModel');
const BlogEspecialidadeSchema = require('./blogEspecialidade');

const BlogComentario = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    usuario: UsuarioSchema,
    especialidade: BlogEspecialidadeSchema,
    texto: String,
    data: Date
});

module.exports = BlogComentario;