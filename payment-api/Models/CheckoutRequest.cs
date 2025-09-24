using System.ComponentModel.DataAnnotations;

namespace PaymentApi.Models;

public class CheckoutRequest
{
    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string Address { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string PaymentMethod { get; set; } = string.Empty;

    [Required]
    public List<OrderItem> Items { get; set; } = new();
}
