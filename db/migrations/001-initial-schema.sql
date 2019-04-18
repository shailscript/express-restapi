-- UP

-- Create a new table called 'Students'
CREATE TABLE Students
(
    id INTEGER NOT NULL PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
);

-- Create a new table called 'Classes' 
CREATE TABLE Classes
(
    id INTEGER NOT NULL PRIMARY KEY,
    code TEXT NOT NULL,
    className TEXT NOT NULL,
    teacherId INTEGER NOT NULL,
    startDate TEXT,
    endDate TEXT,
    CONSTRAINT classes_fk_teacherId
    FOREIGN KEY (teacherId)
    REFERENCES Teachers(id) ON UPDATE CASCADE
);

-- Create a new table called 'Teachers'
CREATE TABLE Teachers
(
    id INTEGER NOT NULL PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
);

-- Create a new table called 'Student_classes'
CREATE TABLE Student_classes
(
    id INTEGER NOT NULL PRIMARY KEY,
    studentId INTEGER NOT NULL,
    classId INTEGER NOT NULL,
    CONSTRAINT pivot_fk_studentId 
    FOREIGN KEY (studentId) 
    REFERENCES Students(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT pivot_fk_classId 
    FOREIGN KEY (classId) 
    REFERENCES Classes(id) ON UPDATE CASCADE ON DELETE CASCADE
    
);

-- Inserting data for testing
INSERT INTO Students (firstName, lastName) VALUES ('Student', 'One');
INSERT INTO Students (firstName, lastName) VALUES ('Student', 'Two');
INSERT INTO Students (firstName, lastName) VALUES ('Student', 'Three');
INSERT INTO Students (firstName, lastName) VALUES ('Student', 'Four');

INSERT INTO Teachers (firstName, lastName) VALUES ('Teacher', 'One');
INSERT INTO Teachers (firstName, lastName) VALUES ('Teacher', 'Two');

INSERT INTO Classes (code, className, teacherId, startDate, endDate ) VALUES ('GBC101', 'BCDV', 1, 'Jan 14', 'Apr 16');
INSERT INTO Classes (code, className, teacherId, startDate, endDate ) VALUES ('GBC102', 'CSEC', 1, 'May 06', 'Aug 10');
INSERT INTO Classes (code, className, teacherId, startDate, endDate ) VALUES ('GBC103', 'DAPP', 1, 'Aug 21', 'Dec 31');
INSERT INTO Classes (code, className, teacherId, startDate, endDate ) VALUES ('GBC201', 'FSD', 2, 'Jan 14', 'Apr 16');
INSERT INTO Classes (code, className, teacherId, startDate, endDate ) VALUES ('GBC202', 'JAVA', 2, 'May 06', 'Aug 10');
INSERT INTO Classes (code, className, teacherId, startDate, endDate ) VALUES ('GBC203', 'AI', 2, 'Aug 21', 'Dec 31');

INSERT INTO Student_classes (studentId, classId) VALUES (1, 1);
INSERT INTO Student_classes (studentId, classId) VALUES (1, 2);
INSERT INTO Student_classes (studentId, classId) VALUES (1, 3);
INSERT INTO Student_classes (studentId, classId) VALUES (2, 1);
INSERT INTO Student_classes (studentId, classId) VALUES (2, 2);
INSERT INTO Student_classes (studentId, classId) VALUES (2, 3);
INSERT INTO Student_classes (studentId, classId) VALUES (3, 4);
INSERT INTO Student_classes (studentId, classId) VALUES (3, 5);
INSERT INTO Student_classes (studentId, classId) VALUES (3, 6);
INSERT INTO Student_classes (studentId, classId) VALUES (4, 4);
INSERT INTO Student_classes (studentId, classId) VALUES (4, 5);
INSERT INTO Student_classes (studentId, classId) VALUES (4, 6);

-- DOWN
DROP TABLE Students;
DROP TABLE Classes;
DROP TABLE Teachers;
DROP TABLE Student_classes;