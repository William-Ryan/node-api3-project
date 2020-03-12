const express = require('express');

const Posts = require("./postDb")
const router = express.Router();

router.get('/', (req, res, next) => {
  Posts.get()
    .then(post => res.json(post))
    .catch(next)
});

router.get('/:id', validatePostId(), (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "The post is deleted"
      })
    })
    .catch(next)
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(){
  return (req, res, next) => {
  Posts.getById(req.params.id)
    .then(post => {
      if(post) {
        req.post = post
        next()
      } else {
        res.status(404).json({
          message: "Post is not found"
        })
      }
    })
    .catch(next)
  }
}

module.exports = router;
