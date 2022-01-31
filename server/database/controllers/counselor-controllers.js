const uuid = require("uuid");
const CounselorModel = require("../../database/models/counselor");

const insertCounselor = async (req, res) => {
  const {
    name,
    gender,
    age,
    ethinicity,
    specializations,
    specializationDesc,
    approach,
    approachDesc,
    credentials,
    introduction,
    price,
    pronouns,
    in_person,
    roles,
    province,
    city,
    in_person_price,
    email
  } = req.body;
  
  const newCounselor = new CounselorModel({
    id: uuid.v4(),
    name,
    gender,
    age,
    ethinicity,
    specializations,
    specializationDesc,
    approach,
    approachDesc,
    credentials,
    introduction,
    price,
    pfp: req.file.path,
    pronouns,
    roles,
    in_person,
    province,
    city,
    in_person_price,
    email,
  });
  try {
    await newCounselor.save();
  } catch (error) {
    console.log(error);
  }
};

exports.insertCounselor = insertCounselor;
