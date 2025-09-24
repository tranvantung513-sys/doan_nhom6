const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  try {
    const { fullName, address, phone, paymentMethod, items } = req.body;

    if (!fullName || !address || !phone || !paymentMethod || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const userId = req.user?.id || "anonymous"; // nếu có xác thực

    const order = new Order({
      userId,
      fullName,
      address,
      phone,
      paymentMethod,
      totalAmount,
      items
    });

    await order.save();
    res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng:", err.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
