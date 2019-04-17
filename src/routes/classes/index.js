import classController from '../../controllers/classController'
const classesRoutes = require('express').Router()

classesRoutes.get('/', classController.list);

classesRoutes.get('/:id', classController.show);

classesRoutes.post('/', classController.create);

classesRoutes.put('/:id', classController.update);

classesRoutes.delete('/:id', classController.delete);

export default classesRoutes