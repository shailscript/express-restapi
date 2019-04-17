const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findAll: async () => {
        const db = getDb();
        const classes = await db.all('SELECT * FROM Classes');
        return classes;
    },

    findById: async (id) => {
        const db = getDb();
        const resultClass = await db.all(`SELECT * FROM Classes WHERE id = ${id}`);
        console.log('I was called to give ', resultClass);
        return resultClass;
    }
}