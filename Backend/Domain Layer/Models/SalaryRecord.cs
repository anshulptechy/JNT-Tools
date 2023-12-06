using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class SalaryRecord : ISalaryEntity
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        public string Role { get; set; }
        public string SalaryMonth { get; set; }
        public int Salary { get; set; }
        public int Leaves { get; set; }
        public int Deductions { get; set; }
        public int NetPay { get; set; }
        public EmployeeSalary Employee { get; set; }
    }
}
