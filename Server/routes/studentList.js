const express = require("express");

const students = require("../json/studentsMain.json");
const studentList = express.Router();

studentList.get("/", (request, response) => {
    //Greeting page
  response.send(            
    "Debug me if you can."
    );
});
studentList.get("/students", (request, response) => {
    //Data of all students
  response.json(students);
});

module.exports = studentList;


