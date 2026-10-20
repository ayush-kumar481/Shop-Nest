const Order = require("../model/Order.js");
const sendEmail = require("../utils/sendEmail");

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (items && items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        address,
        paymentId,
      });
      const createdOrder = await order.save();

      // Email is best effort and should not delay the order response.
      const message = `Hello ${req.user.name}, your ShopNest order ${createdOrder._id} has been placed. Total: ₹${totalAmount.toFixed(2)}. Shipping to: ${address.street}, ${address.city}.`;
      void sendEmail(
        req.user.email,
        "ShopNest - Order Confirmation",
        message,
      ).catch((error) => console.error("Order confirmation email failed:", error));

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };
