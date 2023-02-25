
const express = require("express");
const data = require('../data/data.json');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config()


router.get('/', async (req, res, next) => {
  try {
    res.json(data)
  } catch (error) {
    return next(error)
  }
})

module.exports = router;