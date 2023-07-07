const express = require("express");
const router = express.Router();

// import user
const User = require("../models/User");

// importing validators
const { body, validationResult } = require("express-validator");

// using bcrypt for password hashing
var bcrypt = require("bcryptjs");

// jwt authentication
const JWT_SECRET_KEY = "vatsaljain";
var jwt = require("jsonwebtoken");

// importing middleware
const fetchuser = require('../middleware/fetchuser')

// ROUTE 1: Create a User using POST: '/api/auth'. No login required
router.post(
  "/createuser",
  [
    // validations
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {

let success= false;

    // checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      // check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({ success,error: "Sorry, the user with this email already exists" });
      }

      // password hashing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create the user if he does not exists
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // data sending to jwt token
      const data = {
        user: {
          id: user.id,
        },
      };

      // jwt signing
      const authToken = jwt.sign(data, JWT_SECRET_KEY);
      // console.log(jwtData)

      success=true;

      res.json({ success,authToken });
      // res.json({ success: "User created successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a user. POST:'/api/auth/login'. No login required
router.post(
  "/login",
  [
    // validations
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {

    let success = false;


    // checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // finding the user
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({success, error: "No such user exists/ Invalid Email" });
      }

      // validate password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({ success,error: "Invalid password" });
      }

      // data sending to jwt token
      const data = {
        user: {
          id: user.id,
        },
      };

      // jwt signing
      const authToken = jwt.sign(data, JWT_SECRET_KEY);
      // console.log(jwtData)
success  =true;
      res.json({ success,authToken });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
);


// Route 3: Get logged in user details. POST :'/api/auth/getuser'. Login required

router.post(
  "/getuser",fetchuser,
  async (req, res) => {
try {
  userId = req.user.id
  const user = await User.findById(userId).select("-password")

  res.send(user)
} catch (error) {
  
}})
module.exports = router;
