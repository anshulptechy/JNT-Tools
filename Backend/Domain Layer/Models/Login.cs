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
      
        public int id { get; set; } // Add this property 
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
