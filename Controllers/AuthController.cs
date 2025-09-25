using Microsoft.AspNetCore.Mvc;
using StreamingAPI.DTOs;
using StreamingAPI.Interface;
using StreamingAPI.Models;
using ANG_API_Assess.Services;

namespace StreamingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IToken _tokenService;

        public AuthController(UserService userService, IToken tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto dto)
        {
            var user = new User
            {
                UserName = dto.Username,
                Email = dto.Email,
                PasswordHash = dto.PasswordHash, // ideally hash it
                Role = dto.Role
            };

            var created = await _userService.AddUserAsync(user);
            return Ok(created);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var users = await _userService.GetAllUsersAsync();
            var user = users.FirstOrDefault(u => u.UserName == dto.Username && u.PasswordHash == dto.Password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _tokenService.GenerateToken(user);
            return Ok(new { token });
        }
    }
}
