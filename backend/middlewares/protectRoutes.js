import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid JWT Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User Not Found in Database" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protect routes", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoutes;
