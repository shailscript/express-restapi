const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findAll: async (req, next) => {
        try {
            const db = getDb();
            const students = await db.all('SELECT * FROM Students');
            return students;
        } catch (error) {
            next(error);
        }
    },

    findById: async (id, next) => {
        try {
            const db = getDb();
            const student = await db.all(`SELECT * FROM Students WHERE id = ${id}`);
            return student;
        } catch (error) {
            next(error);
        }
    },

    findClassesById: async (id, next) => {
        try {
            const db = getDb();
            let classes = await db.all(`SELECT classId FROM Student_classes WHERE studentId = ${id}`);
            classes = classes.map(c=> c.classId);
            return classes;
        } catch (error) {
            next(error)
        }
    },

    create: async (newStudent, next) => {
        try {
            const db = getDb();
            const resultStudents = await db.run(`INSERT INTO Students 
                                                (firstName, lastName) 
                                                VALUES ("${newStudent.firstName}", 
                                                        "${newStudent.lastName}"
                                                        )`
                                            );
            return resultStudents.lastID; 
            //Since, the response of a SQL INSERT statement has last inserted id as 'lastID' key
        } catch (error) {
            next(error);
        }
    },

    update: async (data, next) => {
        try {
            const db = getDb();

            const result  = await db.run(`UPDATE Students 
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
            const result = await db.run(`DELETE from Students WHERE id = ${id}`);
            return await result;
        } catch (error) {
            next(error);
        }
    }
}