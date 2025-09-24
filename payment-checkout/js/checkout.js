// Giả lập giỏ hàng lưu trong localStorage
const sampleCart = [
  { productName: "Áo khoác denim", quantity: 1, unitPrice: 500000 },
  { productName: "Giày sneaker", quantity: 2, unitPrice: 750000 }
];
localStorage.setItem("cart", JSON.stringify(sampleCart));

// Hiển thị giỏ hàng
const cartList = document.getElementById("cartList");
const totalAmountEl = document.getElementById("totalAmount");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

cart.forEach(item => {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.innerHTML = `<span>${item.productName} × ${item.quantity}</span><span>${(item.quantity * item.unitPrice).toLocaleString()}đ</span>`;
  cartList.appendChild(li);
  total += item.quantity * item.unitPrice;
});
totalAmountEl.textContent = total.toLocaleString() + "đ";

// Gửi dữ liệu lên backend
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    fullName: document.getElementById("fullname").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    paymentMethod: document.querySelector('input[name="payment"]:checked').value,
    items: cart
  };

  fetch("https://localhost:5001/api/checkout", {
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
        alert("Thanh toán thất bại");
      }
    });
});
