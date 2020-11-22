const express = require("express");

const students = require("../json/students.json");
const studentProfile = express.Router();

studentProfile.get('/profile/student', (request, response) => {
    response.json(students[0]); 
});

studentProfile.get('/profile/student/:id', (request, response) => {
    profile = request.params;
    
    if( 'id' in profile && profile.id ){               // Test that student_id property exists & is not blank
       const student  = students.find( student => student.student_id === parseInt(profile.id, 10));
        if(student){
            response.json(student);                                            // Student Found
        }else {
            response.sendStatus(404);                                      // Student Not Found
        }
    } else {
        response.sendStatus(400);                                           // Bad Request
    }
});

module.exports = studentProfile;