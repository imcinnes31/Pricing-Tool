const mongoose = require("mongoose");

const Counselor = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  ethnicity: [{
    type: String,
    required: false,
  }],
  issues: [{
    type: String,
    required: false,
  }],
  insurance: [{
    type: String,
    required: false,
  }],
  therapy_type: [{
    type: String,
    required: false,
  }],
  credentials: [{
    type: String,
    required: false,
  }],
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  pfp: {
    type: String,
    required: false,
  },
  pronouns: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  //new fields
  city: {
    type: String,
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
  package_number: {
    type: Number,
    required: false,
  },
  package_total: {
    type: Number,
    required: false,
  },
  capacity: {
    type: Number,
    required: false,
  },
  //more new fields
  fut_credential: {
    type: String,
    required: false,
  },
  roles: [{
    type: String,
    required: false,
  }],
  min_supervision_rate: {
    type: Number,
    required: false,
  },
  max_supervision_rate: {
    type: Number,
    required: false,
  },
  date_of_agreement: {
    type: Date,
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