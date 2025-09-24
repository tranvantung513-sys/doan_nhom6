using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaymentApi.Data;
using PaymentApi.Models;
using System.Security.Claims;

namespace PaymentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CheckoutController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public CheckoutController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    [Authorize] // Nếu hệ thống đã có xác thực
    public IActionResult Post([FromBody] CheckoutRequest request)
    {
        if (!ModelState.IsValid || request.Items == null || !request.Items.Any())
            return BadRequest(new { success = false, message = "Dữ liệu không hợp lệ" });

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "anonymous";

        var order = new Order
        {
            UserId = userId,
            FullName = request.FullName,
            Address = request.Address,
            Phone = request.Phone,
            PaymentMethod = request.PaymentMethod,
            Items = request.Items,
            TotalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice),
            Status = OrderStatus.Pending
        };

        _db.Orders.Add(order);
        _db.SaveChanges();

        return Ok(new { success = true, orderId = order.Id });
    }
}
