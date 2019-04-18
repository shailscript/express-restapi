# REST APIs using ExpressJS
___
> A backend web application to implement Representational State Transfer(REST) APIs for some resources.


## Description
___
The objective for the this project is to create a REST api that allows the users of the api to interact with a SQL database of classes, teachers, and students. There is **NO authentication implemented** for this api. The api uses NodeJS, Express, and SQLite.


## Getting started
___
### Installation
> Clone the repository or Download and extract the contents of the repository folder

#### Install dependencies using npm
```bash
npm install
```

#### Setting up .env file
Next make sure to create a new .env file and assign PORT for teh application to your .env file:
```
PORT = 3000
```
You can do that using the following command on Linux, Mac or Windows PowerShell
```bash
cp .env.example .env
```
NOTE: By default, this app uses HTTP PORT 3000, so if you haven't configured the .env file kndly make sure that the port 3000 is available for this app.

#### Compiles and hot-reloads for development 
```bash
npm start
```


## Features
___
This app uses the migrations utility of the sqlite library.
The express endpoint should have the following routes.
```
    GET ‘/api/classes’ -- returns an array of all classes.
    GET ‘/api/classes/:id’ -- returns details of a class as json, including name of the teacher of the class.
    POST ‘/api/classes’ -- Creates a class upon receiving json data in form
    PUT ‘/api/classes/:id’ -- updates an existing class record.
    DELETE ‘/api/classes/:id’ -- deletes an existing class record.
    GET ‘/api/students -- returns an array of all students.
    GET ‘/api/students/:id’ -- returns details of a student as json.
    GET ‘/api/students/:id/classes’ -- returns json array of all classes a student is enrolled in.
    POST ‘/api/students -- Creates a student upon receiving json data in form
    PUT ‘/api/students/:id’ -- updates an existing student record.
    DELETE ‘/api/students/:id’ -- deletes an existing student record.
    GET ‘/api/teachers -- returns an array of all teachers.
    GET ‘/api/teachers/:id’ -- returns details of a teacher as json.
    GET ‘/api/teachers/:id/classes’ -- returns an array of all classes a teacher is teaching.
    POST ‘/api/teachers -- Creates a teacher upon receiving json data in form
    PUT ‘/api/teachers/:id’ -- updates an existing teacher record.
    DELETE ‘/api/teachers/:id’ -- deletes an existing teacher record.
    
    // Implementing pivot-relationships
    
    GET '/api/classes/:class_id/students' -- return all students in class.
    POST '/api/classes/:class_id/students' -- with data {student_id} creates a new enrollment for an existing student in the class
    DELETE '/api/classes/:class_id/students/:id' -- deletes a single enrollment record for a student given class id and student id
```

## Examples
___
Where applicable, the body in all requests should be x-www-form-urlencoded, for postman, or -H "Content-Type: application/json" for curl.

Request structure for a Class
```JSON
{
    "code": "TEST",
    "className": "Testing",
    "teacherId": 1,
    "startDate": "XXX 00",
    "endDate": "YYY 00"
}
```

Request structure for a Student
```JSON
{
    "firstName": "John",
    "lastName": "Doe"
}
```

Request structure for a Teacher
```JSON
{
    "firstName": "John",
    "lastName": "Doe"
}
```

Request structure to enroll a Student in a Class
```JSON
{
    "student_id": 1
}
```


## See Also
___
Architectural constraints for Representational State Trasnfer at [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints).
List of Hypertext Transfer Protocol (HTTP) response status codes at [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).


## Author
Shailendra Shukla, shailendra.shukla@georgebrown.ca