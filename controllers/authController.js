const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const signup = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);
  try {
    if (!emailRegex.test(email)) {
      return res.status(403).json({ message: "Email is Invalid" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        message:
          "Password should be 6-20 characters, with a numeric, 1 lowercase and 1 uppercase letter",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullname,
      email,
      password,
    });

    const responseData = {
      success: true,
      fullname: user.fullname,
      email: user.email,
    };

    res.status(201).json(responseData);
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
    console.log(err);
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "No User with that Email Address" });
    }

    // Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const responseData = {
      success: true,
      fullname: user.fullname,
      email: user.email,
      token: token,
    };

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
});

const authStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "Unauthorized, Please Sign-in",
    });
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res
      .status(200)
      .json({ authenticated: true, message: "Authenticated" });
  }
  res.status(401).json({
    authenticated: false,
    message: "Unauthorized, Please Sign-in",
  });
});

const signOut = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = {
  signup,
  signin,
  authStatus,
  signOut,
};
