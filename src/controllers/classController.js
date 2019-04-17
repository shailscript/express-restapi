import classModel from '../models/class'

export default {
    list: async (req, res) => {
        const classes = await classModel.findAll();
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