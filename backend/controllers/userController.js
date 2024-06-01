const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
//const { use } = require("../app");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { hash } = require("bcryptjs");
const cloudinary = require("cloudinary");
//register a user

exports.registerUser = catchAsyncErrors(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body; //first extract from req.body

  const user = await User.create({
    //then create a post request
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both
  //this is for if any one not enter email or password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  //if find email and also password
  //if find user
  const user = await User.findOne({ email }).select("+password");
  //select("+password") eivabe password ta nicchi karon amara age model ee password ta false kore rekhechilam taii
  //jodi user na paii then
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //idPassword matched korlo ki na seta check korbe
  //401 status code mean unotharized user
  const isPasswordMatched = user.comparePassword(password);
  //then go to compare
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout USer

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    //cookie er tokeen er value null kore dao
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  //first find the email
  // not find show error
  //token reset
  //save it
  //generatedurl
  //generated message
  //in the sendMail function pass attritubes as an object
  //everything is correct show message
  //otherwise go to the catch block
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  //get resetPassword token

  const resetToken = user.getResetPasswordToken();

  //first which token generated save those one
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `your password rest token is:- \n\n  ${resetPasswordUrl} \n\n if you have not requested this email please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce website password recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //first creating token hash

  //first hash
  //then find those hash store it in the user find using resetPasswordToken
  // if not find through error
  //if password and confirm password not match show error
  //otherwise store the new password
  //user.resetPasswordToken = undefined; after change password not need this so undefined
  //user.resetPasswordExpire = undefined;
  //save and send token
  const resetPasswordToken = crypto
    .createHash("sha256") //algorithm is sha256
    .update(req.params.token) //update particular token pointed to the req.params.token sseee pointed after / in the url
    .digest("hex"); //it's the hex value

  const user = await User.findOne({
    resetPasswordToken, //find the hash token
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password toke is invalid or has been expired",
        404
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    //confirm password user dibe in the postman
    return next(new ErrorHandler("password does't match", 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined; //if password change then ei gulor theke kii lav taii undefined
  user.resetPasswordExpire = undefined;

  await user.save(); //save user

  sendToken(user, 200, res);
});

//get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  console.log(req.res);
  const user = await User.findById(req.user.id); //jar id create hobe seii login hote parbe sudhu

  res.status(200).json({
    success: true,
    user,
  });
});

//change user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password"); //we need id with the password
  console.log(req.body);
  console.log(req.body.oldPassword);
  const isPasswordMatched = user.comparePassword(req.body.oldPassword);
  //then go to compare
  if (!isPasswordMatched) {
    return next(new ErrorHandler("old password is incorrect", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("confirm password not matched", 401));
  }
  //if oldpassword and new password is same then write user.password=newpassword
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update userprofile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  //update userprofile

  const newUserData = {
    name: req.body.name,
    password: req.body.password,
  };

  //cloudinary

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId); //destroy previous image

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    }); // for after delete previous image add new image

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }; //new jee image add hobe setar public id and avatar add
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    //pass options
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//check how many users make their id in your website

//all user for admin check how many users present their website

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

// get user details to check admin

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id); //its mean /er por je id ta likhbo seta
  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with id ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//user role updated by admin
exports.updateProfileByAdmin = catchAsyncErrors(async (req, res, next) => {
  //update userprofile

  const newUserData = {
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    //pass options
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//user remove by admin
exports.deleteProfileByAdmin = catchAsyncErrors(async (req, res, next) => {
  //update userprofile
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`can't find new user ${req.params.id}`));
  }

  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
