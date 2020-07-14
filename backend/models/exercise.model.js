const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  muscleGroups: {
    primary: { type: Array, required: false },
    secondary: { type: Array, required: false }
  },
  type: { type: String, required: true },
  videoLink: { type: String, required: true },
  metatags: {
    createdAt: { type : Date, default: Date.now },
    updatedAt: { type : Date, default: Date.now }
  }
}, {
  timestamps: false,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
