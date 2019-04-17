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
            next(error);
        }
    },

    create: async (newClass, next) => {
        try {
            const db = getDb();
            const resultClass = await db.run(`INSERT INTO Classes (code, className, teacherId, startDate, endDate) VALUES ("${newClass.code}", "${newClass.name}", ${newClass.teacherId}, "${newClass.startDate}", "${newClass.endDate}")`);
            return resultClass.lastID; 
            //Since, the response of a SQL INSERT statement has last inserted id as lastID
        } catch (error) {
            next(error);
        }
    }
}