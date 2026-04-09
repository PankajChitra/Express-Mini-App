import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });
} ;
import User from "../models/user.js";
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body; 

        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" });
        }
        const salt  = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
        name,
        email,
        password: hashedpassword
        });

        const token = generatetoken(user._id);

        res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email }
        });
    }
    catch (err) {
    next(err);
  }
} 

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Find user + include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = generatetoken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    next(err);
  }
};