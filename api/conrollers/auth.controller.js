import User from "../models/user.model.js";
//no bcrypt bcryptjs cause its will give deployment error
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req.body);

  //get information
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    //using the middleware function to handle the error
    next(errorHandler(400, "All fields are required"));
  }

  //next hash the password of the user
  const hashedPassword = bcryptjs.hashSync(password, 12);

  //create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  //save the user
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};
