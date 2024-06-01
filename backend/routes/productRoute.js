const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  productDetails,
  createProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

//function call through this
//authorizedRoles("admin"),
router.route("/products").get(getAllProducts); //whichone is authenticated those one show

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router.route("/product/:id").get(productDetails); //if user authorized then only give the access to delete and put the request

router.route("/review").put(isAuthenticatedUser, createProductReview);
module.exports = router;
