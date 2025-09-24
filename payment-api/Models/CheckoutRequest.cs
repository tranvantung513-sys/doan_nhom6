namespace PaymentApi.Models;

public class CheckoutRequest
{
    public string FullName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
    public List<OrderItem> Items { get; set; } = new();
}
