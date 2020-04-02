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






//export the Router 
module.exports = router;