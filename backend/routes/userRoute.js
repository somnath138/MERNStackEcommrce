const express = require("express");
const {
  registerUser,
  logoutUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateProfileByAdmin,
  deleteProfileByAdmin,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
  getProductReview,
  deleteProductReview,
} = require("../controllers/productController");
// const {
//   updateProducts,
//   createProductReview,
// } = require("../controllers/productController");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails); //its mean jodi user loged in hoy tobei take getUserDetails access korte parbe
router.route("/me/update").put(isAuthenticatedUser, updateProfile); //if any one loggedin then olny possible to be updateprofile
router.route("/password/update").put(isAuthenticatedUser, updatePassword); //when same user login then only possible to the change password
// ADMIN CHECK USER
router
  .route("/admin/user")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProfileByAdmin)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProfileByAdmin);
router
  .route("/review")
  .get(getProductReview)
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;

// req.params.id; // url ee / er por id extract korte use hoy
// req.body.id; //body theke id extract korte
// req.user.id; //user theke id extract korte
// req.query.id; // data fetch any query then use

//query mean
//http://localhost:3000/page?id=123
// get value of id useing
// findById(req.query.id)
