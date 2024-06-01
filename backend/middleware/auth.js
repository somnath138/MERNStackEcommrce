const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; //access it through the cookie parser which one used in app.js

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET); //get if verify get jwt data which one made in userModel page

  req.user = await User.findById(decodedData.id); //get the id from jwt data

  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    //roles jeta asbe seta always admin ee hobe      then    its store in mongodb role attribute if // asa admin and mongodb er role admin hoy tobe tobe next call kore dao
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce`,
          403
        )
      );
    }
    next();
  };
};
