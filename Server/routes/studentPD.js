const express = require("express");

const studentData = require("../json/studentPD.json");
const studentPD = express.Router();

studentPD.get('/pd', (request, response) => {
    //description of routes
   response.send("type /students for all students, /students/(id) to search for students by id, /students/(communication or resilience or focus)/(score 1-5) to search by student's focus score, /students/search?name=(name) to search by student's name")
});

// gets all students data
studentPD.get("/pd/students", (request, response) => {
  response.json(studentData);
});

//search by score for each resource headings
studentPD.get("/pd/students/:resource/:score", (request, response) => {
  const score = request.params.score;
  const resource = request.params.resource;

  const allowedNumbers = /^[1-5]$/; // ^ and $ to anchor the range and only allow 1 character

  if(resource == "Growth") {
    if (score && score.match(allowedNumbers)) {
      const growthByScore = studentData.filter(
        (student) => student.Growth == score
      );
      response.json(growthByScore);
    } else {
      response.status(400).json({ msg: "Sorry, enter a number between 1-5" });
    }
    
  } else if(resource == "Communication") {
    if (score && score.match(allowedNumbers)) {
      const communicationByScore = studentData.filter(
        (student) => student.Communication == score
      );
      response.json(communicationByScore);
    } else {
      response.status(400).json({ msg: "Sorry, enter a number between 1-5" });
    }
    
  } else if(resource == "Resilience") {
    if (score && score.match(allowedNumbers)) {
      const resilienceByScore = studentData.filter(
        (student) => student.Resilience == score
      );
      response.json(resilienceByScore);
    } else {
      response.status(400).json({ msg: "Sorry, enter a number between 1-5" });
    }
    
  } else {
    response.status(400).json({ msg: "Sorry, enter either Growth, Communication or Resilience" });
  }
});

//gets student by name, for testing put numbers as name
studentPD.get("/pd/students/search", (request, response) => {
  const searchName = request.query.name;

  response.json(
    studentData.filter(
      (student) => (!searchName ? true : student.name.toLowerCase().includes(searchName.toLowerCase()))))
});

// gets students data by ID
studentPD.get("/pd/students/:id", (request, response) => {
  const { id } = request.params;
  const foundStudent = studentData.find(student => student.student_id == id);

  if(foundStudent) {
    response.json(foundStudent);
  } response.status(400).json({ msg: `Student with id: ${id} not found!` });
});

module.exports = studentPD;