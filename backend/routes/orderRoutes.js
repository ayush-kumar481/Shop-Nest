const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();
const {
  addOrderItems,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
