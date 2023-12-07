using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    
    public class Screenshots
    {
       
        public int id
        {
            get;
            set;
        }
        public byte[] ImageData { get; set; }
        public DateTime CreatedAt { get; set; }
        public string GetFormattedCaptureTime()
        {
            return CreatedAt.ToString("yyyy-MM-dd HH:mm:ss");
        }
    }
}
