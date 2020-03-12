const express = require('express');

const Posts = require("./postDb")
const router = express.Router();

router.get('/', (req, res, next) => {
  Posts.get()
    .then(post => res.json(post))
    .catch(next)
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next){
  posts.getById(req.params.id)
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
module.exports = router;
