const express = require('express');
const mongoose = require('mongoose');
const Health = require('../models/health-model');

const router  = express.Router();

// GET route => to get all the scores of the questions
router.get('/health', (req, res, next) => {
  Health.find().populate('score')
    .then(allTheQuestions => {
      res.json(allTheQuestions);
    })
    .catch(err => {
      res.json(err);
    })
});

// POST route => to create a new question
router.post('/health', (req, res, next)=>{
 
  Health.create({
    question: req.body.question,
    score: req.body.score,
    owner: req.user._id
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific question view
router.get('/health/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our projects have array of tasks' ids and 
  // we can use .populate() method to get the whole task objects
  //                                   ^
  //                                   |
  //                                   |
  Health.findById(req.params.id).populate('score')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific project
router.put('/health/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Health.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Question with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific question
router.delete('/health/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Health.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Question with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})



module.exports = router;