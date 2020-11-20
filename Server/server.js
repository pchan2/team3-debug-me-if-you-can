const express = require('express');
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());                    // body parser
app.use(express.urlencoded({ extended: false }));                 // HTML forms parser

const studentProfile = require("./routes/studentprofile");      // API routes for Student Profiles Screen
app.use(studentProfile);

// API routes for Students List Screen
const studentList = require("./routes/studentList");      
app.use(studentList);

// API routes for Students PD Screen
const studentPD = require("./routes/studentPD");      
app.use(studentPD);

app.listen(PORT, _ => console.log(`server is listening on ${PORT}`));