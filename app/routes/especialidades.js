module.exports = (app) => {
    app.post('/blog/especialidade/cadastrar', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Especialidade.especialidadeController.cadastrarEspecialidade(app, req, res);
    });

    app.get('/blog/especialidade/pegarEspecialidade/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Especialidade.especialidadeController.pegarEspecialidadeIndividual(app, req, res);
    });

    app.patch('/blog/especialidade/atualizarEspecialidade/:id', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Especialidade.especialidadeController.atualizarEspecialidade(app, req, res);
    });

    app.patch('/blog/especialidade/atualizarEspecialidade/foto/:id_especialidade', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        app.app.controller.Especialidade.especialidadeController.atualizarFotoEspecialidade(app, req, res);
    });
}