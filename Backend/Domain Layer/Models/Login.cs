using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    [Keyless]
    public class Login
    {
        [ForeignKey("UserId")]
        public Signup Signup { get; set; } // Navigation property for the Department  entity
        public int UserId { get; set; } // Add this property 
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
