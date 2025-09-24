using System.ComponentModel.DataAnnotations;

namespace PaymentApi.Models;

public class OrderItem
{
    public int Id { get; set; }

    [Required]
    public string ProductName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }
}
