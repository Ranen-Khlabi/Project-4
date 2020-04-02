//Require necearry NPM pacjage
const express = require("express");
//Require Mongoose Model for Students
const Student = require("../model/Student")
//Instantiate a Router (min app that only handles routes)
const router = express.Router();


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
 * @method POST
 * @route   /api/students
 * @action  CREATE
 * @desc    Create a new student
 */
router.post("/api/students", (req, res) => {
    // Add the student recieved from the request body to the database
    Student.create(req.body.student)
        .then(student => res.status(201).json({ student }))
        .catch(error => res.status(500).json({ error }));
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






//export the Router 
module.exports = router;