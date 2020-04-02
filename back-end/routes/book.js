//Require necearry NPM pacjage
const express = require("express");
//Require Mongoose Model for Organization
const Book = require('../model/Book')
//Instantiate a Router (min app that only handles routes)
const router = express.Router();



/**
 * @method  GET
 * @route  /api/books
 * @action  INDEX
 * @desc    Get All books 
 */
router.get('/api/books', (req, res) => {
    Book.find()
    // Return all book as an Array
    .then((book) => {
      res.status(200).json({ book });
      console.log(books)
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });



//export the Router 
module.exports = router;