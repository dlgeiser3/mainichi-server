require("dotenv").config();

let express = require('express');
let router = express.Router();
const kanji = require('./kanji/kanji-365.json');

// let validateSession = require('../middleware/validate-session');


router.get('/:id', (req, res) => {
  const index = kanji.length >= req.params.id 
    ? req.params.id - 1
    : req.params.id;

  if (kanji[index] !== undefined) {
    res.status(200).send(kanji[index])
  } else {
    res.status(404).send()
  }
});

module.exports = router;