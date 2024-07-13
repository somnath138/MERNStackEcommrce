const Product = require("../models/productModels"); //if you give the only link of the file directory that's the enough to access
const ErrorHandler = require("../utils/errorhandler"); //use for errror handleing
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); //use for errror handleing
const ApiFeatures = require("../utils/apifeatures");
const { findByIdAndUpdate } = require("../models/userModel");
const { query } = require("express");
const error = require("../middleware/error");

//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
  //request.body theke user request pathanor sathe sathe id tao pathay dibe
  req.body.user = req.user.id; //it pass through the productMdel

  const product = await Product.create(req.body); //only write this line we create a new product

  res.status(201).json({
    //response of the product
    success: true,
    product,
  }); //eigulo show korbe agar status thik hoy tobe
});

//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const resultPerpage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerpage);

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerpage,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update products --admin
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id); //find partucular product

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  //if product find then findByIdAndUpdate which take id and body
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //findByIdAndUpdate id wise product find and update it
    runValidators: true,
    useFindAndModify: false,
  });

  //status
  return res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  await product.deleteOne();

  //status only
  res.status(200).json({
    success: true,
    message: "product delete successfully",
  });
});

//GET PRODUCT DETAIL

exports.productDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//when you will make the it will be created or when you update the review it will be updated

//review systum
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id, //take user id
    name: req.user.name, //user name
    rating: Number(rating), //take rating and comment from body
    comment,
  };

  const product = await Product.findById(productId); //if find the product

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        //convert both id inn the string format
        (rev.rating = rating), (rev.comment = comment); //put rating and the comment
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.ratings =
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    }) / product.reviews.length; // product.review.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all reviews
exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Product.findById(req.query.id);
  if (!review) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: review.reviews,
  });
});

//delete review
//first a fall find product then delete
//filterout all review without those review

exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!review) {
    return next(new ErrorHandler("product not found", 404));
  }
  const review = await product.filter(
    (rev) => rev._id.toString() !== rev.query.id.toString()
  );

  //if review deleted then rating also decrease
  //it's only review part so access rating of the review part
  let avg = 0;
  const ratings =
    review.forEach((rev) => {
      avg += rev.rating;
    }) / review.length; // product.review.length;

  const NumberOfReview = review.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      review,
      ratings,
      NumberOfReview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: review.reviews,
  });
});
