module.exports = (app) => {
    app.post('/blog/cadastro/usuario', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Usuario.usuarioController.cadastroDesbravadorMongo(app, req, res);
    })

    app.post('/blog/cadastro/usuario/avancado', (req, res) => {

    })

    app.post('/blog/logar/usuario', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        app.app.controller.Usuario.usuarioController.logarUsuario(app,req, res);
    })

    app.get('/blog/info/ususario/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Usuario.usuarioController.pegarDadosUsuario(app, req, res);
    })

    app.patch('/blog/atualizar/usuario/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Usuario.usuarioController.atualizarDadosUsuario(app, req, res);
    })

    app.patch('/blog/atualizar/usuario/foto_perfil/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Usuario.usuarioController.atualizarFotoPerfil(app, req, res);
    })
} 