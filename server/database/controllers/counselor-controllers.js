const uuid = require("uuid");
const CounselorModel = require("../../database/models/counselor");

const insertCounselor = async (req, res) => {
  // console.log(req.body);
  // if (req.file) {
  //   console.log(req.file);
  // }
  // else {
  //   console.log("THERE IS NO FILE");
  // }
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
    email,
    languages,
    min_supervision_rate,
    existing_pfp_path,
    descriptionLong,
  } = req.body;
  // if (existing_pfp_path) {
  //   console.log(existing_pfp_path);
  // }
  // else {
  //   console.log("THERE IS NO EXISTING FILE");
  // }
  const pfp = req.file ? req.file.path.replace(/\\/g, "/") : existing_pfp_path ? existing_pfp_path : "https://picsum.photos/id/" + Math.ceil(Math.random() * 100) + "/360/240";
  
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
    pfp,
    pronouns,
    roles,
    in_person,
    province,
    city,
    in_person_price,
    email,
    languages,
    min_supervision_rate,
    descriptionLong,
  });
  try {
    await newCounselor.save();
  } catch (error) {
    console.log(error);
  }
};

exports.insertCounselor = insertCounselor;
