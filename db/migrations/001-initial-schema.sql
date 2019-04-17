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
    REFERENCES Students(id) ON UPDATE CASCADE ON DELETE CASCADE
    
);

-- DOWN
DROP TABLE Students;
DROP TABLE Classes;
DROP TABLE Teachers;
DROP TABLE Student_classes;