import User from "../models/user.model.js";
//no bcrypt bcryptjs cause its will give deployment error
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

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

//sign in
export const signin = async (req, res, next) => {
  //get information

  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    //using the middleware function to handle the error
    next(errorHandler(400, "All fields are required"));
  }

  //find the user
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    //check if the password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    //generate the token
    const token = Jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    //send the token
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
