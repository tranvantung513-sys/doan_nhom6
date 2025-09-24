using Microsoft.AspNetCore.Mvc;
using PaymentApi.Data;
using PaymentApi.Models;

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
    public IActionResult Post([FromBody] CheckoutRequest request)
    {
        if (request == null || request.Items == null || !request.Items.Any())
            return BadRequest(new { success = false, message = "Dữ liệu không hợp lệ" });

        var order = new Order
        {
            FullName = request.FullName,
            Address = request.Address,
            Phone = request.Phone,
            PaymentMethod = request.PaymentMethod,
            Items = request.Items,
            TotalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice)
        };

        _db.Orders.Add(order);
        _db.SaveChanges();

        return Ok(new { success = true, orderId = order.Id });
    }
}
