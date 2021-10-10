const express = require('express');
const User = require('../mongo_modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middlewares/fatchuser')

const JWT_secreate = "hii@howareyou$$$$"

//ROUTE1 : Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  
  // If there are errors, return Bad request and the errors

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const Auth_token = jwt.sign(data, JWT_secreate);
     success = true;
   
    res.json({success, Auth_token })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})

//ROUTE2 : login User using: POST "/api/auth/login".
router.post('/login', [
  body('email', 'Enter a valid email').isEmail({ min: 3 }),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const compassword = await bcrypt.compare(password, user.password)
    if (!compassword) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const Auth_token = jwt.sign(data, JWT_secreate);
    success = true;
    res.json({ success, Auth_token })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router