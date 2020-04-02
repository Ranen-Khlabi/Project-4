//Require necearry NPM pacjage
const express = require("express");
//Require Mongoose Model for Contributor
const Contributor = require('../model/Contributor')
//Require Mongoose Model for Book
const Book = require('../model/Book')
//Instantiate a Router (min app that only handles routes)
const router = express.Router();



/**
 * @method GET
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







//export the Router 
module.exports = router;