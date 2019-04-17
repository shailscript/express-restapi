import classModel from '../models/class'
const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    list: (req, res) => {
        const db = getDb();
        const classes = classModel.findAll(db);
        res.status(200).json( {
            classes
        })
    }
}