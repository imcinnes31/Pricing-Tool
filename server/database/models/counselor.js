const mongoose = require("mongoose");

const Counselor = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  ethnicity: [{
    type: String,
    required: false,
  }],
  specializations: [{
    type: String,
    required: true,
  }],
  specializationDesc:{
    type: String,
    required: true
  },
  approach: [{
    type: String,
    required: true,
  }],
  approachDesc:{
    type: String,
    required: true,
  },
  credentials: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pfp: {
    type: String,
    required: true,
  },
  pronouns: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
//                                             v schema variable
module.exports = mongoose.model('counselors', Counselor)
//                               ^ data collection name (Check mongo compass/ mongo CLI) 