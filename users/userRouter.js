const express = require('express');

const User = require("./userDb.js");
const Post = require("../posts/postDb.js")

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Error adding the user.' })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  User.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving the users.' })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  User.getById(req.params.id)
  .then(user => {
    if(user) {
      req.user = user;
    } else {
      res.status(400).json({ message: "invalid user id" })
    }
  })
  next();
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if(req.body.name === "") {
    res.status(400).json({ message: "missing required name field" })
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if(req.body.name === "") {
    res.status(400).json({ message: "missing required text field" })
  }else{
    next();
  }
}

module.exports = router;
