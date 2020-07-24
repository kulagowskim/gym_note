const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const muslceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

const Muscle = mongoose.model('Muscle', muslceSchema);

module.exports = Muscle;
