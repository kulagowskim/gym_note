const router = require('express').Router();
let Muscle = require('../models/muscle.model');

router.route('/').get((req, res) => {
  Muscle.find()
    .then(muscles => res.json(muscles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const { name, nameLatin, muscleFunction, structure, photo } = req.body

  if (!name || !muscleFunction) {
    return res.status(422).json({ error: "Please add all the fields" })
  }

  const muscle = new Muscle({ name, nameLatin, muscleFunction, structure, photo });

  muscle.save()
    .then(() => res.json('Muscle added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
