import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModule from "../models/user.module.js";

// @desc     Create user
// @route    POST /register
// @access   Public
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } = req.body;
  try {
    // check if user exist
    const userExist = UserModule.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords doesn't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModule.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      image: "",
    });

    const token = jwt.sign(
      { email: user.email, id: user._id, image: "" },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// @desc     Login user
// @route    POST /login
// @access   Public
export const loginUser = async (req, res) => {
  try {
    const { email, password, image } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "please provide an email and password" });
    }
    const user = await UserModule.findOne({ email });
    // check if user exist
    if (!user) {
      return res.status(404).json({ message: "user doesn't exist" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id, image: "" },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
