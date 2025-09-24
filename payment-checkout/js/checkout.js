// Giả lập giỏ hàng lưu trong localStorage (chỉ dùng khi test)
const sampleCart = [
  { productName: "Áo khoác denim", quantity: 1, unitPrice: 500000 },
  { productName: "Giày sneaker", quantity: 2, unitPrice: 750000 }
];
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify(sampleCart));
}

// Hiển thị giỏ hàng
const cartList = document.getElementById("cartList");
const totalAmountEl = document.getElementById("totalAmount");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

if (cart.length === 0) {
  cartList.innerHTML = `<li class="list-group-item text-muted">Giỏ hàng của bạn đang trống</li>`;
} else {
  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `<span>${item.productName} × ${item.quantity}</span><span>${(item.quantity * item.unitPrice).toLocaleString()}đ</span>`;
    cartList.appendChild(li);
    total += item.quantity * item.unitPrice;
  });
}
totalAmountEl.textContent = total.toLocaleString() + "đ";

// Gửi dữ liệu lên backend
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống");
    return;
  }

  const phone = document.getElementById("phone").value;
  if (!/^(0[3-9][0-9]{8})$/.test(phone)) {
    alert("Số điện thoại không hợp lệ");
    return;
  }

  const data = {
    fullName: document.getElementById("fullname").value,
    address: document.getElementById("address").value,
    phone: phone,
    paymentMethod: document.querySelector('input[name="payment"]:checked').value,
    items: cart
  };

  fetch("http://localhost:5000/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        localStorage.removeItem("cart");
        window.location.href = "success.html";
      } else {
        alert("Thanh toán thất bại: " + result.message);
      }
    })
    .catch(err => {
      console.error("Lỗi kết nối:", err);
      alert("Không thể kết nối máy chủ. Vui lòng thử lại sau.");
    });
});
