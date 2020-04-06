//Require necearry NPM pacjage
const express = require("express");
//Require Mongoose Model for Students
const Student = require("../model/Student")
const bcrypt = require("bcrypt");
//Instantiate a Router (min app that only handles routes)
const router = express.Router();

//method to Add Student to DataBase
const saveStudent = (student, res) => {
  // Hash the password before saving the student to the DB
  bcrypt
      .hash(student.password, 10)
      .then(hashedPassword => {
          // Replace the plain password with the hashed password
          student.password = hashedPassword;
          // Create new student in the database
          return Student.create(student);
      })
      .then(student => res.status(201).json({ student: {name: student.name}}))
      .catch(err => res.status(500).json({ msg: err.message }));
};



/**
 * @method : GET
 * @route : /api/students
 * @action :  index
 * @desc    : get all student
 */
router.get("/api/students", (req, res) => {
    Student.find()
      .then(student => {
        res.status(200).json({ students: student });
      })
      //catch any errors that may accours
      .catch(error => {
        res.status(500).json({ error: error });
      });
  });



/**
 * @method : GET
 * @route  : /api/student/id
 * @action :  Show
 * @desc   : get an student by student ID
 */
router.get("/api/students/:id", (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      if (student) {
        res.status(200).json({ students: student });
      } else {
        // if we coudn't find a document with matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError ",
            message: "The  providednId dosen't match any documents"
          }
        });
      }
    })
    //catch any errors that may accours
    .catch(error => {
      res.status(500).json({ error: error });
    });
});



/**
 * @method POST
 * @route   /api/students
 * @action  CREATE
 * @desc    Create a new student
 */
router.post("/api/students", (req, res) => {
    // Get the student object from the request body
  const newStudent = req.body.student;
  // Check if the name already exists
  Student.findOne({ name: newStudent.name })
      .then(student => {
          if (student) {
              return res.status(500).json({ msg: "Name already exists." });
          } else {
              // In case the name is not already used save the new student.
              saveStudent(newStudent, res);
          }
      })
      .catch(err => res.status(500).json({ msg: err.message }));
});



/**
 * @method PATCH
 * @route   /api/students/id
 * @action  UPDATE
 * @desc    Update a student by ID
 */
router.patch("/api/students/:id", (req, res) => {
  // Find the student with the passed ID
  Student.findById(req.params.id)
    .then(student => {
      // Check if a student is found by the passed ID
      if (student) {
        // Update the existing student with the new data from the request body
        return student.update(req.body.student);
      } else {
        // If no student was found by the passed ID, send an error message as response
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    .then(() => {
      // If the update succeeded, return 204 and no JSON response
      res.status(204).end();
    })
    .catch(error => res.status(500).json({ error }));
});



/**
 * @method  : delete
 * @route   : /api/students/id
 * @action  : Destory
 * @desc    : delete an student by student ID
 */
router.delete("/api/students/:id", (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      if (student) {
        //pass the result of mongooes's ".delete" method to thee next ".then"
        student.remove();
      } else {
        // if we coudn;t find a document with matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError ",
            message: "The  providednId dosen't match any documents"
          }
        });
      }
    })
    //another then
    .then(() => {
      // if the deletion succeeded , return 204 and no JSON
      res.status(204).end();
    })
    .catch(error => {
      res.status.json({ error: error });
    });
});






//export the Router 
module.exports = router;