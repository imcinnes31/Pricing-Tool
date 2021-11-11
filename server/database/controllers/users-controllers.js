const UserModel = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { firstName, lastName, email, phone, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new UserModel({
    userId: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    role: "Client", //"Client, Counselor, Admin"
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" } //login expires in 1hour
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
    role: createdUser.role,
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Invalid username or password entered, please try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid username or password entered, please try again",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" } //login expires in 1hour
    );
  } catch (err) {
    const error = new HttpError("Logining in failed, please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    role: existingUser.role,
  });
};

const userRoleChange = async (req, res, next) => {
  const role = req.params.role;
  const email = req.params.emailKey;
  let existingUser;

  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Cannot find user, lease try again later.",
      500
    );
    return next(error);
  }
  console.log(existingUser);
  existingUser.role = role;
  console.log(existingUser);
  try {
    // existingUser.role = role;
    await existingUser.save();
  } catch (err) {
    // const error = new HttpError("Update failed, please try again.", 500);
    return next(err);
  }

  console.log(existingUser);

  // let isValidPassword = false;
  // try {
  //   isValidPassword = await bcrypt.compare(password, existingUser.password);
  // } catch (err) {
  //   const error = new HttpError(
  //     "Invalid username or password entered, please try again",
  //     500
  //   );
  //   return next(error);
  // }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });
};

const userDeleteByEmail = async (req, res, next) => {
  const email = req.params.emailKey;
  let existingUser;

  try {
    existingUser = await UserModel.deleteOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Cannot find user, lease try again later.",
      500
    );
    return next(error);
  }
};

const searchByEmail = async (req, res, next) => {
  const email = req.params.emailKey;
  let existingUser;

  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
  }
  // console.log(existingUser);
  res.json({
    existingUser
  });
};

exports.getUsers = getUsers;
exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.userRoleChange = userRoleChange;
exports.userDeleteByEmail = userDeleteByEmail;
exports.searchByEmail = searchByEmail;
