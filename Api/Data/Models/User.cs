using System;
using Microsoft.AspNetCore.Identity;

namespace Api.Data.Models
{
	public class User : IdentityUser
	{
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public DateOnly DateCreated { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
	}
}

