import studentModel from '../models/student'
import classModel from '../models/class'

export default {
    list: async (req, res, next) => {
        try {
            const students = await studentModel.findAll(req, next);
            res.status(200).json( {
                students: students
            });
        } catch (error) {
            next(error);
        }
    },
    
    show: async (req, res, next) => {
        try {
            const studentId = req.params.id * 1; //Shorthand to convert into number
            const student = await studentModel.findById(studentId, next);
            if (student !== undefined) {
                return res.status(200).send(student);
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            next(error);
        }
    },

    showClasses: async (req, res, next) => {
        try {
            const studentId = req.params.id * 1; //Shorthand to convert into number
            const studentClassIds = await studentModel.findClassesById(studentId, next);
            
            if (studentClassIds !== undefined) {
                //reference: https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
                
                let promiseArray = studentClassIds.map(async (classId) => {
                    const temp = await classModel.findById(classId, next);
                    return temp[0];
                }); 
                
                let studentClasses = await Promise.all(promiseArray);
                
                return res.status(200).send({
                    classes : studentClasses
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
                const newStudent = {
                    ...req.body
                };
                const createdStudentId = await studentModel.create(newStudent, next);
                const created = await studentModel.findById(await createdStudentId, next);
                return res.status(201).send({
                    student: created
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
                const student = await studentModel.findById(id, next);
                if( await student.length === 0){
                    return res.status(404).send({
                        error: 'Resource not found. Nothing to update.'
                    })
                } else {
                    const data = {
                        ...req.body
                    };
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            student[0][key] = data[key];
                        }
                    }
                    
                    const updatedStudent = await studentModel.update(student[0], next);
                    if(await updatedStudent) {
                        const updated = await studentModel.findById(id, next);
                        return res.status(200).send({
                            student: updated
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
            const student = await studentModel.findById(id, next);
            if( await student.length === 0){
                return res.status(404).send({
                    error: 'Resource not found. Nothing to delete.'
                })
            } else {
                const deletedStudent = await studentModel.delete(id, next);
                if (deletedStudent !== undefined || deletedStudent !== null) {
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