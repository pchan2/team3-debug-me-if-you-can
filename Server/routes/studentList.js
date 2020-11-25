const express = require("express");

const students = require("../json/studentsMain.json");
const locations = require("../json/locations.json");
const classes = require("../json/classes.json");
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

studentList.get("/locations", (request, response) => {
  //Data of all locations
  response.json(locations);
});

studentList.post("/locations", (request, response) => {
  //Add new location
  const newLocation = request.body.location;
  const foundLocation = locations.findIndex((item) => item === newLocation);
  if (foundLocation === -1) {
    locations.push(newLocation);
    response.send("Success!");
  } else {
    response
      .status(400)
      .json({ msg: `Location with name ${newLocation} has already present!` });
  }
});

studentList.put("/locations/:name", (request, response) => {
  //Change location
  const locationName = request.params.name;
  const locationUpd = request.body.location;

  const foundLocation = locations.findIndex((item) => item === locationName);
  if (foundLocation !== -1) {
    locations.splice(foundLocation, 1, locationUpd);
    response.send("Success!");
  } else {
    response
      .status(400)
      .json({ msg: `Location with name ${locationName} not found!` });
  }
});

studentList.delete("/locations/:name", (request, response) => {
  //Delete location
  const locationName = request.params.name;

  const foundLocation = locations.findIndex((item) => item === locationName);
  if (foundLocation !== -1) {
    const locationEntrees = students
      .filter((item) => item.location === locationName)
      .map((item) => item.name);
    if (!locationEntrees.length) {
      locations.splice(foundLocation, 1);
      response.send("Success!");
    } else {
      response.status(400).json({
        msg: `Location with name ${locationName} is used in student profiles and cannot be deleted. First, remove the mention of this location in student profiles or student profiles themselves. Students list: ${locationEntrees}`,
      });
    }
  } else {
    response
      .status(400)
      .json({ msg: `Location with name ${locationName} not found!` });
  }
});

studentList.get("/classes", (request, response) => {
  //Data of all classes
  response.json(classes);
});

studentList.post("/classes", (request, response) => {
  //Add new class
  const newClass = request.body.class;
  const foundClass = classes.findIndex((item) => item === newClass);
  if (foundClass === -1) {
    classes.push(newClass);
    response.send("Success!");
  } else {
    response
      .status(400)
      .json({ msg: `class with name ${newClass} has already present!` });
  }
});

studentList.put("/classes/:name", (request, response) => {
  //Change class
  const className = request.params.name;
  const classUpd = request.body.class;

  const foundClass = classes.findIndex((item) => item === className);
  if (foundClass !== -1) {
    classes.splice(foundClass, 1, classUpd);
    response.send("Success!");
  } else {
    response
      .status(400)
      .json({ msg: `class with name ${className} not found!` });
  }
});

studentList.delete("/classes/:name", (request, response) => {
  //Delete class
  const className = request.params.name;

  const foundClass = classes.findIndex((item) => item === className);
  if (foundClass !== -1) {
    const classEntrees = students
      .filter((item) => item.className === className)
      .map((item) => item.name);

    if (!classEntrees.length) {
      classes.splice(foundClass, 1);
      response.send("Success!");
    } else {
      response.status(400).json({
        msg: `class with name ${className} is used in student profiles and cannot be deleted. First, remove the mention of this class in student profiles or student profiles themselves. Students list: ${classEntrees}`,
      });
    }
  } else {
    response
      .status(400)
      .json({ msg: `class with name ${className} not found!` });
  }
});

studentList.get("/complex", (request, response) => {
  //Data of all students
  response.json({ students: students, locations: locations, classes: classes });
});

studentList.get("/complex/search", (request, response) => {
  const location = request.query.location;
  const className = request.query.className;
  const term = request.query.term;

  //Data of all students filtered by location, class name and search term
  response.json({
    students: students
      .filter((item) => (!location ? true : item.location === location))
      .filter((item) => (!className ? true : item.className === className))
      .filter((item) =>
        !term ? true : item.name.toLowerCase().includes(term.toLowerCase())
      ),
    locations: locations,
    classes: classes,
  });
});

//Add new student
studentList.post("/students", (request, response) => {
  const newStudent = request.body;
  newStudent.id =
    Math.max.apply(
      null,
      students.map((item) => item.id)
    ) + 1;
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
