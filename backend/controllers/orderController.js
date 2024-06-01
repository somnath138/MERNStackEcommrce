const Order = require("../models/orderModel");
const Product = require("../models/productModels"); //if you give the only link of the file directory that's the enough to access
const ErrorHandler = require("../utils/errorhandler"); //use for errror handleing
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); //use for errror handleing
const { param } = require("../app");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  //we need
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id, //get the user id also which user create this order//get user from reqq.user
  }); //created orderdetails
  res.status(201).json({
    //response of the product
    success: true,
    order,
  }); //eigulo show korbe agar status thik hoy tobe
});

//get single order
//single order only aacess admin
//populate("user") go to the particular user id following the user match the user id in the use and return the name and email
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  //   .populate(
  //     "user",
  //     "name email"
  //   );  not use this

  if (!order) {
    return next(new ErrorHandler("norder not found with this id", 404));
  }
  res.status(200).json({
    //response of the product
    success: true,
    order,
  });
});

//particular loggedin user id
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return next(new ErrorHandler("norder not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get all orders check only admins

exports.checkAllOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  //   console.log("hello", req);
  //   console.log("rakesh", req.user._id);
  const orders = await Order.find(); //get all the orders which create user or not create user

  let totalAmount = 0;
  orders.forEach((orders) => {
    totalAmount += orders.totalPrice;
  });
  res.status(201).json({
    //response of the product
    success: true,
    totalAmount,
    orders,
  });
});

//update order  status  --admin
exports.updateOrdre = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id); //get order
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have already delivered this product", 404)
    ); //if orderStatus === "Dlivered" then it will be show
  }
  //if not deliver update orderItem whenever it will be not delivered
  //maintain the quantity
  order.orderItems.forEach(async (order) => {
    //for update for the quantity pass the product id and the quantity to the product
    await updateStock(order.product, order.quantity);
  });
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    //if it's status is delivered then set the time when it delivered
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id); //get the product

  product.stock -= quantity; //update the quantity of the product

  await product.save({ validateBeforeSave: false });
}

//delete order -- Admin

exports.deleteOder = catchAsyncErrors(async (req, res, nexr) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
