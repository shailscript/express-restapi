import teacherModel from '../models/teacher'

export default {
    list: async (req, res, next) => {
        try {
            const teachers = await teacherModel.findAll(req, next);
            res.status(200).json( {
                teachers: teachers
            });
        } catch (error) {
            next(error);
        }
    },
    
    show: async (req, res, next) => {
        try {
            const teacherId = req.params.id * 1; //Shorthand to convert into number
            const teacher = await teacherModel.findById(teacherId, next);
            if (teacher !== undefined) {
                return res.status(200).send(teacher);
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            next(error);
        }
    },

    showClasses: async (req, res, next) => {
        try {
            const teacherId = req.params.id * 1; //Shorthand to convert into number
            const teacherClasses = await teacherModel.findClassesByTeacherId(teacherId, next);
            
            if (teacherClasses !== undefined) {
                return res.status(200).send({
                    classes : teacherClasses
                });
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            next(error);
        }
    },

    /**
     * Valid request structure
     * {
            "firstName": "John",
            "lastName": "Doe"
        }
     */

    create: async (req, res, next) => {
        try {
            if (Object.keys(req.body).length === 0 || req.body.firstName === '' || req.body.lastName === '') {
                res.status(406).send({
                    error: 'Not Acceptable. Invalid request.'
                  })
            } else {
                const newTeacher = {
                    ...req.body
                };
                const createdTeacherId = await teacherModel.create(newTeacher, next);
                const created = await teacherModel.findById(await createdTeacherId, next);
                return res.status(201).send({
                    teacher: created
                })
            }
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            if (Object.keys(req.body).length === 0) {
                res.status(411).send({
                    error: 'Length Required. Invalid request. Nothing to update.'
                });
            } else {
                const id = req.params.id;
                const teacher = await teacherModel.findById(id, next);
                if( await teacher.length === 0){
                    return res.status(404).send({
                        error: 'Resource not found. Nothing to update.'
                    })
                } else {
                    const data = {
                        ...req.body
                    };
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            teacher[0][key] = data[key];
                        }
                    }
                    
                    const updatedTeacher = await teacherModel.update(teacher[0], next);
                    if(await updatedTeacher) {
                        const updated = await teacherModel.findById(id, next);
                        return res.status(200).send({
                            teacher: updated
                        })
                    } else {
                        return res.status(500).send({
                            error: 'Internal server error. Sorry we messed up something :('
                        })
                    }
                    
                }
            }
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const teacher = await teacherModel.findById(id, next);
            if( await teacher.length === 0){
                return res.status(404).send({
                    error: 'Resource not found. Nothing to delete.'
                })
            } else {
                const deletedTeacher = await teacherModel.delete(id, next);
                if (deletedTeacher !== undefined || deletedTeacher !== null) {
                    return res.status(200).send({
                        id: id
                    })
                } else {
                    res.status(500).send({
                        error: 'Internal server error. Sorry we messed up something :('
                    })
                }
            }
        } catch (error) {
            next(error);
        }
    }

}