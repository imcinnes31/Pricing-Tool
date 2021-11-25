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
    required: true,
  }],
  specializations: [{
    type: String,
    required: true,
  }],
  specializationDesc:{
    type: String,
    required: true
  },
  therapy_type: [{
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
    required: false,
  },

  //new fields
  roles: [{
    type: String,
    required: false,
  }],
  capacity: {
    type: Number,
    required: false,
  },
  in_person: {
    type: Boolean,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  in_person_price: {
    type: Number,
    required: false,
  },
  virtual_price: {
    type: Number,
    required: false,
  },
  EMDR_price: {
    type: Number,
    required: false,
  },
  package_info: {
    type: String,
    required: false,
  },
  min_supervision_rate: {
    type: Number,
    required: false,
  },
  max_supervision_rate: {
    type: Number,
    required: false,
  },
  test_data: {
    type: Boolean,
    required: false,
  }
});
//                                             v schema variable
module.exports = mongoose.model('counselors', Counselor)
//                               ^ data collection name (Check mongo compass/ mongo CLI) 