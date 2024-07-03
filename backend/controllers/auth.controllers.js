import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import createAndSetToken from "../utils/createAndSetToken.js";

export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const isUsernameTaken = await User.findOne({ username });
    if (isUsernameTaken) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return res.status(400).json({ error: "Email already in exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password length must be at least 8 characters" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store hashed password in the database
    const newUser = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      createAndSetToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    createAndSetToken(user._id, res);
    res.status(200).json({ message: "User Logged in successfully" });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "User Logged out successfully" });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getCurrentUser", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
