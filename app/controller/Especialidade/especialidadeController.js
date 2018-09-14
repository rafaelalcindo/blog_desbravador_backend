const mongoose = require('mongoose');
const BlogEspecialidadeSchema = require('../../models/blogEspecialidade');
const BlogCategoriaSchema     = require('../../models/blogCategoria');
const especialidadeModel = mongoose.model('Especialidade', BlogEspecialidadeSchema);
const categoriaModel     = mongoose.model('Categoria',BlogCategoriaSchema);

var especialidade = new especialidadeModel;