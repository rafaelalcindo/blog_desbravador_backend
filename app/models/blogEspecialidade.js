const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BlogEspecialidadeSchema = new Schema({
    titulo: String,
    criado_por: String,
    cadastrado_em: { type: Date, default: Date.now },
    requisitos: String,
});