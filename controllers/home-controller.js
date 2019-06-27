require("dotenv").config();

let express = require('express');
let router = express.Router();
let sequelize = require('../db');

let validateSession = require('../middleware/validate-session');

var Story = sequelize.import('../models/story');
// Story.sync({force:true})

/* *************************
 *** POST CREATE ***
************************** */


router.post('/', validateSession, (req, res) => {
  console.log('req.user.username =>', req.user.username)
  const storyRequest = {
    text: req.body.story.text,
    likes: req.body.story.likes,
    studied: req.body.story.studied,
    owner: req.user.id, 
    ownerName: req.user.username,
    kanji:req.body.story.kanji
  }
  Story.create(storyRequest)
    .then(story => res.status(200).json(story))
    .catch(err => res.status(500).json({ error: err }))
});

/* *************************
 *** GET ALL MNEMONICS ***
************************** */

router.get("/", (req, res) => {
  Story.findAll()
    .then( stories => res.status(200).json(stories) )
    .catch( err => res.status(500).json({ error: err }) )
});


/* *************************
 *** POST UPDATE ***
************************** */

router.put('/:id', validateSession, (req, res) => {
  Story.update(req.body.story, {
    where: {
      id: req.params.id,
      owner: req.user.id
    },
    returning: true
  })
    .then(story => res.status(200).json(story))
    .catch(err => res.status(500).json({ error: err }))
});


/* *************************
 *** POST DELETE ***
************************** */

router.delete("/:id", validateSession, (req, res) => {
  Story.destroy({
    where: {
      id: req.params.id,
      owner: req.user.id
    },
  })
    .then(story => res.status(200).json(story))
    .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;