using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Attendences 
    {
        public int Id { get; set; }
        public int EmpId
        {
            get;
            set;
        }
        public string EmpName
        {
            get;
            set;
        }
        public string? month
        {
            get;
            set;
        }

        public string? Designation
        {
            get;
            set;
        }
        public DateTime? Date
        {
            get;
            set;
        }

        public string? Status
        {
            get;
            set;
        }
        public DateTime? LoginTime
        {
            get;
            set;
        }
        public DateTime? LogoutTime
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
