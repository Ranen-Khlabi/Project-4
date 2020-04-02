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



/**
 * @method GET
 * @route  /api/books:id
 * @action  SHOW
 * @desc    Get An books by books ID
 */
router.get('/api/books/:id', (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
          if (book) {
            res.status(200).json({books: book});
          } else {
            // If we couldn't find a document with the matching ID
            res.status(404).json({
              error: {
                name: 'DocumentNotFoundError',
                message: 'The provided ID doesn\'t match any documents'
              }
            });
          }
        })
        // Catch any errors that might occur
        .catch((error) => {
          res.status(500).json({ error: error });
        })
    });



/**
 * @method  POST
 * @route   /api/books
 * @action  CREATE
 * @desc    Create a new books
 */
router.post("/api/books", (req, res) => {
    // Add the books recieved from the request body to the database
    Book.create(req.body.book)
        .then(book => res.status(201).json({ book }))
        .catch(error => res.status(500).json({ error }));
});



//export the Router 
module.exports = router;