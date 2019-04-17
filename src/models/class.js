const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findAll: async ()=> {
        const db = getDb();
        const classes = await db.all('SELECT * FROM Classes');
        console.log('I was called to give ', classes);
        return classes;
    }
}