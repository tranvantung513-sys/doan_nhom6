const { poolPromise, sql } = require("../config/db");

exports.createOrder = async (req, res) => {
  try {
    const { fullName, address, phone, paymentMethod, items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Giỏ hàng trống" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const pool = await poolPromise;

    const orderResult = await pool.request()
      .input("FullName", sql.NVarChar, fullName)
      .input("Address", sql.NVarChar, address)
      .input("Phone", sql.NVarChar, phone)
      .input("PaymentMethod", sql.NVarChar, paymentMethod)
      .input("TotalAmount", sql.Decimal(18, 2), totalAmount)
      .query(`
        INSERT INTO Orders (FullName, Address, Phone, PaymentMethod, TotalAmount)
        OUTPUT INSERTED.Id
        VALUES (@FullName, @Address, @Phone, @PaymentMethod, @TotalAmount)
      `);

    const orderId = orderResult.recordset[0].Id;

    for (const item of items) {
      await pool.request()
        .input("OrderId", sql.Int, orderId)
        .input("ProductName", sql.NVarChar, item.productName)
        .input("Quantity", sql.Int, item.quantity)
        .input("UnitPrice", sql.Decimal(18, 2), item.unitPrice)
        .query(`
          INSERT INTO OrderItems (OrderId, ProductName, Quantity, UnitPrice)
          VALUES (@OrderId, @ProductName, @Quantity, @UnitPrice)
        `);
    }

    res.status(201).json({ success: true, orderId });
  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng:", err.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
