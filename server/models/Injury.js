const { Schema, model, Mongoose } = require('mongoose');

const injurySchema = new Schema({
  location: {
    type: String,
    required: true
  },
  painType: {
    type: String,
    trim: true
  },
  howInjured:{
    type: Text, 
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
  }
});

const Injury = mongoose.model('Injury', injurySchema);
module.exports - Injury;

