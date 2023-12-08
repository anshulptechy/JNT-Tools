using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Screenshot
    {
        [Key]
        public int ScreenshotId { get; set; }
        public int id { get; set; }
        public byte[] ImageData { get; set; }
        public DateTime CreatedAt { get; set; }



        // Add other properties as needed

        // You can also define methods related to the model
        public string GetFormattedCaptureTime()
        {
            return CreatedAt.ToString("yyyy-MM-dd HH:mm:ss");
        }
    }
}

