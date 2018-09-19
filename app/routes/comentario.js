module.exports = (app) => {

    app.post('/blog/comentario/cadastrarComentario', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Comentario.comentarioController.inserirComentario(app, req, res);
    })

    
}