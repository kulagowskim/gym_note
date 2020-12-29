const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nameLatin: {
    type: String,
    required: true
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
  },
  metatags: {
    createdAt: { type : Date, default: Date.now },
    updatedAt: { type : Date, default: Date.now }
  }
}, {
  timestamps: false,
});

const Muscle = mongoose.model('Muscle', muscleSchema);

module.exports = Muscle;
