import classModel from '../models/class'

export default {
    list: async (req, res) => {
        const classes = await classModel.findAll();
        res.status(200).json( {
            classes
        })
    }
}