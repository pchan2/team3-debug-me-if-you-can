const express = require("express");

const studentData = require("../json/studentPD.json");
const studentPD = express.Router();

studentPD.get('/pd', (request, response) => {
    //description of routes
   response.send("type /students for all students, /students/(id) to search for students by id, /students/focus/(score) to search by student's focus score, /students/search?name=(name) to search by student's name")
});

// gets all students data
studentPD.get("/pd/students", (request, response) => {
  response.json(studentData);
});

//proof of concept can search by score for focus heading
studentPD.get("/pd/students/focus/:score", (request, response) => {
  const { score } = request.params;
  const focusByScore = studentData.filter((student) => student.Focus == score);
  response.json(focusByScore);
});

//gets student by name, for testing put numbers as name
studentPD.get("/pd/students/search", (request, response) => {
  const searchName = request.query.name;

  response.json(studentData.filter((student) => student.name.includes(searchName)));
});

// gets students data by ID
studentPD.get("/pd/students/:id", (request, response) => {
  const { id } = request.params;
  const foundStudent = studentData.find(student => student.student_id == id);

  response.json(foundStudent);
});

module.exports = studentPD;