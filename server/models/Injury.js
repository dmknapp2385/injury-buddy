const { Schema, model } = require('mongoose');

const injurySchema = new Schema({
  location: {
    type: String,
    required: true
  },
  painType: {
    type: String,
    trim: true
  },
  howInjured: {
    type: String,
    trim: true,
    maxlenght: 250
  },
  cronic: {
    type: Boolean,
    required: true,
    trim: true
  },
  timeInjured: {
    type: Number,
    min: 0,
    default: 0
  }, 
});

const Injury = model('Injury', injurySchema);

module.exports = Injury;
