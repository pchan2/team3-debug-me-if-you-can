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
    },
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
  newStudent.id = Math.max.apply(null, students.map(item => item.id)) + 1;
  students.push(newStudent);
  response.send("Success!");
});

//Delete student
studentList.delete("/students/:id", (request, response) => {
  const studentId = request.params.id;
  const found = students.findIndex((item) => item.id == studentId);
  if (found >= 0) {
    students.splice(found, 1);
    response.send("Success!");
  } else {
    response
      .status(400)
      .json({ msg: `Student with id ${studentId} not found!` });
  }
});

//Update student
studentList.put("/students/:id", (request, response) => {
  const studentId = request.params.id;
  const studentUpd = request.body;

  const foundStudent = students.find((item) => item.id == studentId);
  if (!!foundStudent) {
    foundStudent.name = studentUpd.name;
    foundStudent.photo = studentUpd.photo;
    foundStudent.pdBuddy = studentUpd.pdBuddy;
    foundStudent.eduBuddy = studentUpd.eduBuddy;
    foundStudent.gitHub = studentUpd.gitHub;
    foundStudent.englishTest = studentUpd.englishTest;
    foundStudent.languageSupport = studentUpd.languageSupport;
    response.send("Success!");
  } else {
    response
      .status(400)
      .json({ msg: `Student with id ${studentId} not found!` });
  }
});

module.exports = studentList;
