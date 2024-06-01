const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  checkAllOrdersAdmin,
  updateOrdre,
  deleteOder,
} = require("../controllers/orderController");
const router = express.Router();
router.route("/order/new").post(isAuthenticatedUser, newOrder); //if user authenticate then only possible to be logged in
//check to all
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
//check only admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), checkAllOrdersAdmin);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrdre)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOder);
module.exports = router;
