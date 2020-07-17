const router = require('express').Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', requireLogin, (req, res) => {
  const { name, type, videoLink, muscleGroups } = req.body

  if (!name || !type || !videoLink) {
    return res.status(422).json({ error: "Please add all the fields" })
  }

  const exercise = new Exercise({
    name,
    type,
    videoLink,
    muscleGroups,
  })

  exercise.save()
    .then(result => {
      res.json({ exercise: result })
    })
    .catch(err => {
      console.log(err);
    })
})

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/add').post((req, res) => {
//   const name = req.body.name;
//   const description = req.body.description;
//   const duration = Number(req.body.duration);
//   const date = Date.parse(req.body.date);

//   const newExercise = new Exercise({
//     name,
//     description,
//     duration,
//     date,
//   });

//   newExercise.save()
//     .then(() => res.json('Exercise added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.name = req.body.name;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
