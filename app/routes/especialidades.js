module.exports = (app) => {
    app.post('/blog/especialidade/cadastrar', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Especialidade.especialidadeController.cadastrarEspecialidade(app, req, res);
    });

    app.get('/blog/especialidade/pegarEspecialidade/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Especialidade.especialidadeController.pegarEspecialidadeIndividual(app, req, res);
    })
}