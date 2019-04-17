const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findAll: async (req, next) => {
        try {
            const db = getDb();
            const classes = await db.all('SELECT * FROM Classes');
            return classes;
        } catch (error) {
            next(error);
        }
    },

    findById: async (id, next) => {
        try {
            const db = getDb();
            const resultClass = await db.all(`SELECT * FROM Classes WHERE id = ${id}`);
            return resultClass;
        } catch (error) {
            next(error)
        }
    }
}