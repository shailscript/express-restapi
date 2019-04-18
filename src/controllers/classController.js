import classModel from '../models/class'

export default {
    list: async (req, res, next) => {
        try {
            const classes = await classModel.findAll(req, next);
            res.status(200).json( {
                classes: classes
            });
        } catch (error) {
            next(error);
        }
    },
    
    show: async (req, res, next) => {
        try {
            const classId = req.params.id * 1; //Shorthand to convert into number
            const resultClass = await classModel.findById(classId, next);
            if (resultClass !== undefined) {
                return res.status(200).send(resultClass);
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
            "code": "TEST",
            "name": "Testing",
            "teacherId": 1,
            "startDate": "XXX 00",
            "endDate": "YYY 00"
        }

        NOTE that the teacherId is expected to be a number, or the request would be considered invalid.
     */

    create: async (req, res, next) => {
        try {
            if (Object.keys(req.body).length === 0 || req.body.name === '' || req.body.code === '' || !typeof(req.body.teacherId) === 'number') {
                console.log( typeof(req.body.teacherId) === 'number');
                res.status(406).send({
                    error: 'Not Acceptable. Invalid request.'
                  })
            } else {
                const newClass = {
                    ...req.body
                };
                const createdClassId = await classModel.create(newClass, next);
                const created = await classModel.findById(await createdClassId, next);
                return res.status(201).send({
                    class: created
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
                const requestedClass = await classModel.findById(id, next);
                if( await requestedClass.length === 0){
                    return res.status(404).send({
                        error: 'Resource not found. Nothing to update.'
                    })
                } else {
                    const data = {
                        ...req.body
                    };

                    console.log(JSON.stringify(data));
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            requestedClass[0][key] = data[key];
                        }
                    }
                    
                    const updatedClass = await classModel.update(requestedClass[0], next);
                    if(await updatedClass) {
                        const updated = await classModel.findById(id, next);
                        return res.status(200).send({
                            class: updated
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

    delete: async (req, res) => {
        res.status(200).json( {
            value: "working"
        })
    }

}