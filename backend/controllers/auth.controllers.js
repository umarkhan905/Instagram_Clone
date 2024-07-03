import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import createAndSetToken from "../utils/createAndSetToken.js";

export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password, question, answer } = req.body;

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
    const hashedAnswer = await bcrypt.hash(answer.toLowerCase(), salt);

    const securityQuestion = { question, answer: hashedAnswer };

    // Store hashed password in the database
    const newUser = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
      securityQuestion,
    });
    if (newUser) {
      createAndSetToken(newUser._id, res);
      await newUser.save();

      newUser.password = null;
      newUser.securityQuestion.answer = null;
      res.status(201).json({ newUser });
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, answer } = req.body;

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
    const user = await User.findById(req.user._id).select(
      "-password -securityQuestion.answer"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getCurrentUser", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { answer, email, newPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Incorrect Email or Security Answer" });
    }

    const isAnswerCorrect = await bcrypt.compare(
      answer.toLowerCase(),
      user.securityQuestion.answer
    );
    if (!isAnswerCorrect) {
      return res
        .status(401)
        .json({ error: "Incorrect Email or Security Answer" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
      { new: true }
    );

    if (updatedUser) {
      createAndSetToken(updatedUser._id, res);
      updatedUser.password = null;
      updatedUser.securityQuestion.answer = null;
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log("Error in Forgot password", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
