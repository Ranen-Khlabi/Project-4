//Require necearry NPM pacjage
const express = require("express");
//Require Mongoose Model for Contributor
const Contributor = require('../model/Contributor')
//Require Mongoose Model for Book
const Book = require('../model/Book')
//Instantiate a Router (min app that only handles routes)
const router = express.Router();









//export the Router 
module.exports = router;