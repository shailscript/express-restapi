import classController from '../../controllers/classController'
const classesRoutes = require('express').Router()

classesRoutes.get('/', classController.list);

classesRoutes.get('/:id', (req, resp) => {
    return resp.send("Received a GET request for a specified classes item");
});

classesRoutes.post('/', (req, resp) => {
    return resp.send("Received a POST request to classes");
});

classesRoutes.put('/:id', (req, resp) => {
    return resp.send("Received a PUT request for a specified classes item");
});

classesRoutes.delete('/:id', (req, resp) => {
    return resp.send("Received a DELETE request for a specified classes item");
});

export default classesRoutes