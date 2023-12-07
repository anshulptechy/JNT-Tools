using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Attendences
    {

        public int id
        {
            get;
            set;
        }
        public int UserId { get; set; }
        public DateTime LoginTime
        {
            get;
            set;
        }
        public DateTime LogoutTime
        {
            get;
            set;
        }
        public TimeSpan? Hours
        {
            get;
            set;
        }

    }
}
