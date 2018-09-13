module.exports = (app) => {
    app.post('/blog/categorias/cadastrar', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Categoria.categoriaController.cadastroCategoria(app, req, res)
    })
}