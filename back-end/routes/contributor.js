//Require necearry NPM pacjage
const express = require("express");
//Require Mongoose Model for Contributor
const Contributor = require('../model/Contributor')
//Require Mongoose Model for Book
const Book = require('../model/Book')
//Instantiate a Router (min app that only handles routes)
const router = express.Router();



/**
 * @method  GET
 * @route  /api/contributors
 * @action  INDEX
 * @desc    Get All contributors 
 */
router.get('/api/contributors', (req, res) => {
    Contributor.find()
    // Return all contributor as an Array
    .then((contributor) => {
      res.status(200).json({ contributors: contributor });
      console.log(contributors)
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });



/**
 * @method  GET
 * @route  /api/contributors:id
 * @action  SHOW
 * @desc    Get An contributors by contributors ID
 */
router.get('/api/contributors/:id', (req, res) => {
    Contributor.findById(req.params.id)
        .then((contributor) => {
          if (contributor) {
            res.status(200).json({contributors: contributor});
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
 * @method POST
 * @route   /api/contributors
 * @action  CREATE
 * @desc    Create a new contributors
 */
router.post("/api/contributors", (req, res) => {
    // Add the contributors recieved from the request body to the database
    Contributor.create(req.body.contributor)
        .then(contributor => res.status(201).json({ contributor }))
        .catch(error => res.status(500).json({ error }));
});



/**
 * @method  PATCH
 * @route   /api/contributors/:id
 * @action  UPDATE
 * @desc    Update a contributors by ID
 */
router.patch("/api/contributors/:id", (req, res) => {
    // Find the contributor with the passed ID
    Contributor.findById(req.params.id)
        .then(contributor => {
            // Check if a contributor is found by the passed ID
            if (contributor) {
                // Update the existing contributor with the new data from the request body
                return contributor.update(req.body.contributors);

            } else {
                // If no contributor was found by the passed ID, send an error message as response
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
 * @method  DELETE
 * @route   /api/contributors/id
 * @action  DESTROY
 * @desc    Delete An contributor by contributor ID
 */
router.delete("/api/contributors/:id", (req, res) => {
    // Find the contributor with the passed ID
    Contributor.findById(req.params.id)
        .then(contributor => {
            // Check if a contributor is found by the passed ID
            if (contributor) {
               // pass the result of Mongoose's  .delete method to next.then statment
                return contributor.delete();
            } else {
                // If no user was found by the passed ID, send an error message as response
                res.status(404).json({
                    error: {
                        name: "DocumentNotFoundError",
                        message: "The provided ID doesn't match any documents"
                    }
                });
            }
        })
        .then(() => {
          return Book.deleteMany({contributor:req.params.id})
        })
        .then(()=>{
           res.status(204).end();
        })
        .catch(error => res.status(500).json({ error }));
});






//export the Router 
module.exports = router;