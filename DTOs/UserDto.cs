namespace StreamingAPI.DTOs
{
    public class UserDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!; 
        public string Role { get; set; } = null!;   
    }
}
