const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findAll: async (req, next) => {
        try {
            const db = getDb();
            const teachers = await db.all('SELECT * FROM Teachers');
            return teachers;
        } catch (error) {
            next(error);
        }
    },

    findById: async (id, next) => {
        try {
            const db = getDb();
            const teacher = await db.all(`SELECT * FROM Teachers WHERE id = ${id}`);
            return teacher;
        } catch (error) {
            next(error);
        }
    },

    findClassesByTeacherId: async (id, next) => {
        try {
            const db = getDb();
            let classes = await db.all(`SELECT * FROM Classes WHERE teacherId = ${id}`);
            return classes;
        } catch (error) {
            next(error)
        }
    },

    create: async (newTeacher, next) => {
        try {
            const db = getDb();
            const resultTeachers = await db.run(`INSERT INTO Teachers 
                                                (firstName, lastName) 
                                                VALUES ("${newTeacher.firstName}", 
                                                        "${newTeacher.lastName}"
                                                        )`
                                            );
            return resultTeachers.lastID; 
            //Since, the response of a SQL INSERT statement has last inserted id as 'lastID' key
        } catch (error) {
            next(error);
        }
    },

    update: async (data, next) => {
        try {
            const db = getDb();

            const result  = await db.run(`UPDATE Teachers 
                                            SET firstName = "${data.firstName}", 
                                            lastName = "${data.lastName}"
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
            const result = await db.run(`DELETE from Teachers WHERE id = ${id}`);
            return await result;
        } catch (error) {
            next(error);
        }
    }
}