using Api.Authenticate.Services;
using Api.Data.Models;
using Api.DTOs.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JWTService _jwtService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AccountController(
            JWTService jWTService,
            SignInManager<User> signInManager,
            UserManager<User> userManager
            )
        {
            _jwtService = jWTService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);
            if (user == null) return Unauthorized("Invalid Username or Password!");

            if (user.EmailConfirmed == false) return Unauthorized("Please confirm your Email-Adress!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded) return Unauthorized("Invalid Username or Passwrd");

            return CreateUserDto(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
        {
            if (await CheckUsernameExistsAsync(dto.UserName))
                return BadRequest($"An existing account is using {dto.UserName}, username!");

            if (await CheckEmailExistsAsync(dto.Email))
                return BadRequest($"An existing account is using {dto.Email}, email address!");

            var user = new User
            {
                UserName = dto.UserName.ToLower(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email.ToLower(),
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded) BadRequest(result.Errors);

            return CreateUserDto(user);
        }

        private async Task<bool> CheckUsernameExistsAsync(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        private async Task<bool> CheckEmailExistsAsync(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }

        private UserDto CreateUserDto(User user)
        {
            return new UserDto
            {
                UserName = user.UserName ?? "",
                Token = _jwtService.CreateJWT(user)
            };
        }

    }
}

