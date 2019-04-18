import teacherController from '../../controllers/teacherController'
const teachersRoutes = require('express').Router()

teachersRoutes.get('/', teacherController.list);

teachersRoutes.get('/:id', teacherController.show);

teachersRoutes.get('/:id/classes', teacherController.showClasses);

teachersRoutes.post('/', teacherController.create);

teachersRoutes.put('/:id', teacherController.update);

teachersRoutes.delete('/:id', teacherController.delete);

export default teachersRoutes