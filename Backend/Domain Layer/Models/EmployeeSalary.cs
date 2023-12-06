using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class EmployeeSalary : ISalaryEntity
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }

        [JsonIgnore]
        public ICollection<SalaryRecord> SalaryRecords { get; set; }
    }
}
