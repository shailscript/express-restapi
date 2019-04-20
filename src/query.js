const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findAll: async (resource) => {
        try {
            const db = getDb();
            const result = await db.all(`SELECT * FROM ${resource}`);
            return result;
        } catch (error) {
            next(error);
        }
    },

    findById: async (resource, id, next) => {
        try {
            const db = getDb();
            const result = await db.all(`SELECT * FROM ${resource} WHERE id = ${id};`);
            return result;
        } catch (error) {
            next(error);
        }
    },

    create: async (resource, newClass, next) => {
        try {
            const db = getDb();
            const result = await db.run(`INSERT INTO ${resource} 
                                                (code, className, teacherId, startDate, endDate) 
                                                VALUES ("${newClass.code}", 
                                                        "${newClass.className}", 
                                                        ${newClass.teacherId}, 
                                                        "${newClass.startDate}", 
                                                        "${newClass.endDate}"
                                                        )`
                                            );
            return result.lastID; 
            //Since, the response of a SQL INSERT statement has last inserted id as 'lastID' key
        } catch (error) {
            next(error);
        }
    },

    update: async (data, next) => {
        try {
            const db = getDb();

            const result  = await db.run(`UPDATE Classes 
                                            SET code = "${data.code}", 
                                            className = "${data.className}", 
                                            teacherId = ${data.teacherId} , 
                                            startDate = "${data.startDate}", 
                                            endDate = "${data.endDate}" 
                                            WHERE id = '${data.id}'`
                                        );
            return result.changes;
            //Since, the response of a SQL UPDATE statement has changes recorded in 'changes' key
        } catch (error) {
            next(error)
        }
    },

    delete: async (id, next) => {
        try {
            const db = getDb();
            const result = await db.run(`DELETE from Classes WHERE id = ${id}`);
            return await result;
        } catch (error) {
            next(error);
        }
    }
}