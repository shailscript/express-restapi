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
            const resultClass = await db.all(` SELECT Classes.*, Teachers.firstName AS TeacherFirstname, Teachers.lastName AS TeacherLastname FROM Classes INNER JOIN Teachers ON Classes.teacherId = Teachers.id WHERE Classes.id = ${id};`);
            return resultClass;
        } catch (error) {
            next(error);
        }
    },

    create: async (newClass, next) => {
        try {
            const db = getDb();
            const resultClass = await db.run(`INSERT INTO Classes 
                                                (code, className, teacherId, startDate, endDate) 
                                                VALUES ("${newClass.code}", 
                                                        "${newClass.className}", 
                                                        ${newClass.teacherId}, 
                                                        "${newClass.startDate}", 
                                                        "${newClass.endDate}"
                                                        )`
                                            );
            return resultClass.lastID; 
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