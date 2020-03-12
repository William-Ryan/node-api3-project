const express = require('express');

const Posts = require("./postDb")
const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(post => res.json(post))
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({
        err: "The post could not be removed"
      })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  console.log(req.post)
  if(req.post){
  res.status(200).json(req.post)
  } else {
    res.status(500)
    .json({
      message: "The specified Post could not be found"
    })
  }
});

router.delete('/:id', validatePostId(), (req, res) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "The post is deleted"
      })
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({
        message: "The post could not be removed"
      })
    })
});

router.put('/:id', validatePostId(), (req, res) => {
  console.log(req.body)
  Posts.update(req.params.id, req.body)
  .then(() => {
      res.status(200).json({
        message: "Post is updated"
      })
  })
  .catch()
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
