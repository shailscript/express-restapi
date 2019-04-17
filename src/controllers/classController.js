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
        res.status(200).json( {
            classes
        })
    },
    
    show: async (req, res) => {
        const resultClass = await classModel.findById(req.params.id);
        res.status(200).json( {
            resultClass
        })
    },
    }
}