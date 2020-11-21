const express = require("express");

const students = require("../json/studentsMain.json");
const studentList = express.Router();

studentList.get("/", (request, response) => {
  //Greeting page
  response.json([
    "Debug me if you can.",
    {
      "request with filters":
        "/students/search?location=Birmingham&className=Class1&term=zub",
    },
    {
      "request with empty location and term ":
        "/students/search?location=&className=Class1&term=",
    },
    {
      "request with empty location, className and term - all students":
        "/students/search?location=&className=&term=",
    }
  ]);
});
studentList.get("/students", (request, response) => {
  //Data of all students
  response.json(students);
});

studentList.get("/students/search", (request, response) => {
  const location = request.query.location;
  const className = request.query.className;
  const term = request.query.term;

  //Data of all students filtered by location, class name and search term
  response.json(
    students
      .filter((item) => (!location ? true : item.location === location))
      .filter((item) => (!className ? true : item.className === className))
      .filter((item) =>
        !term ? true : item.name.toLowerCase().includes(term.toLowerCase())
      )
  );
});

//Add new student
studentList.post("/students", (request, response) => {
  const newStudent = request.body;
  newStudent.id = students.length;
  students.push(newStudent);
  response.send("Success!");
});

module.exports = studentList;
