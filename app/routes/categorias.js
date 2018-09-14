module.exports = (app) => {
    app.post('/blog/categorias/cadastrar', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Categoria.categoriaController.cadastroCategoria(app, req, res);
    });

    app.patch('/blog/categoria/atualizar/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Categoria.categoriaController.atualizarCategoria(app, req, res);
    });

    app.get('/blog/categorias/listarCategoria', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Categoria.categoriaController.listarTodasCategorias(app, req, res);
    })
};