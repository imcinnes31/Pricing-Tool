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
    roles
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
    province: 'UNDEFINED_PLACE_HOLDER',
    city: 'UNDEFINED_PLACE_HOLDER',
    in_person_price: -1, //placeholder

  });
  try {
    await newCounselor.save();
  } catch (error) {
    console.log(error);
  }
};

exports.insertCounselor = insertCounselor;
