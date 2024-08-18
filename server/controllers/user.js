import User from "../models/User.js";

const postSignUp = async (req, res) => {
  const {
    fullName,
    email,
    password,
    dob,
    date_of_joining,
    experience,
    position,
    profilePhoto
  } = req.body

  const user = new User({
    fullName,
    email,
    password,
    dob: new Date(dob),
    date_of_joining: new Date(date_of_joining),
    experience,
    position,
    profilePhoto

  })

  try {
    const savedUser = await user.save();

    res.json({
      success: true,
      message: "User Registered Successfully..",
      data: savedUser
    })
  }

  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }

}

const postLogin = async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({
    email: email,
    password: password
  })



  if (user) {
    res.json({
      success: true,
      message: "Login Successfully...",
      data: user
    })
  }

  else {
    res.json({
      success: false,
      message: "User not found",
      data: null
    })
  }

}

export { postSignUp, postLogin }