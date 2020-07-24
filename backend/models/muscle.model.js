const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  muscleFunction: {
    type: String,
    required: true,
  },
  structure: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});

const Muscle = mongoose.model('Muscle', muscleSchema);

module.exports = Muscle;
