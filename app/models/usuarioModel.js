const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const UsuarioSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    sobrenome: String,
    login: String,
    senha: String,
    privilegio: Number,
    descricao: String,
    clube: String,
    unidade: String,
    foto_perfil: String
});

module.exports = UsuarioSchema;