class ErrorHandler extends Error {
  //it extend from the ErrorHandler class Error is default class
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor); //point to the current object(ErrorHandler) and point to the current constractor
    //use of captureStackTrace explain in error.js page
  }
}
module.exports = ErrorHandler;
