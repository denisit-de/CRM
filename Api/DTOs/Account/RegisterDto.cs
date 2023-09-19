using System;
using System.ComponentModel.DataAnnotations;

namespace Api.DTOs.Account
{
	public class RegisterDto
	{
		[Required]
		[StringLength(30, MinimumLength = 3, ErrorMessage = "Username must be at least {2} and maximum {1} characters!")]
		public string UserName { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		[Required]
		[RegularExpression("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", ErrorMessage = "Invalid Email-Address!")]
		public string Email { get; set; }
		[Required]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Password must be at least {2} and maximum {1} characters!")]
        public string Password { get; set; }
	}
}

