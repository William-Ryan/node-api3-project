const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
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
  // do your magic!
}

module.exports = router;
