module.exports = (app) => {
    app.post('/blog/cadastro/usuario', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Usuario.usuarioController.cadastroDesbravadorMongo(app, req, res);
    })

    app.post('/blog/cadastro/usuario/avancado', (req, res) => {

    })
} 