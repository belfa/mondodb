const DirversController = require('../controllers/drivers_controllers');

module.exports = (app) => {
    // Watch for incoming requestss of method GET
    // to the reoute http://localhost:3050/api
    app.get('/api', DirversController.greeting);

    app.post('/api/drivers', DirversController.create);
    app.put('/api/drivers/:id', DirversController.edit);
    app.delete('/api/drivers/:id', DirversController.delete);
    app.get('/api/drivers', DirversController.index);
}