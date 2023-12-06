using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Screenshots 
    {
        public int Id { get; set; }
        public int EmpId { get; set; } // Add employee ID
        public byte[] ImageData { get; set; }
        public DateTime CreatedAt { get; set; }
        public string GetFormattedCaptureTime()
        {
            return CreatedAt.ToString("yyyy-MM-dd HH:mm:ss");
        }
    }
}
