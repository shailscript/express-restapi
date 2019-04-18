import studentController from '../../controllers/studentController'
const studentsRoutes = require('express').Router()

studentsRoutes.get('/', studentController.list);

studentsRoutes.get('/:id', studentController.show);

studentsRoutes.get('/:id/classes', studentController.showClasses);

studentsRoutes.post('/', studentController.create);

studentsRoutes.put('/:id', studentController.update);

studentsRoutes.delete('/:id', studentController.delete);

export default studentsRoutes