using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryReportController : ControllerBase
    {
        private readonly ISalaryService _service;

        public SalaryReportController(ISalaryService service)
        {
            _service = service;
        }

        [HttpGet("all-employees")]
        public async Task<ActionResult<IEnumerable<EmployeeSalary>>> GetAllEmployees()
        {
            var employees = await _service.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("employee-details/{employeeId}")]
        public async Task<ActionResult<IEnumerable<SalaryRecord>>> GetEmployeeDetails(int employeeId)
        {
            var employeeDetails = await _service.GetEmployeeDetailsAsync(employeeId);
            return Ok(employeeDetails);
        }

        [HttpGet("salary-records/{month}")]
        public async Task<ActionResult<IEnumerable<SalaryRecord>>> GetSalaryRecordsByMonth(string month)
        {
            var salaryRecords = await _service.GetSalaryRecordsByMonthAsync(month);
            return Ok(salaryRecords);
        }

        [HttpPost("add-salary-record")]
        public async Task<ActionResult> AddSalaryRecord([FromBody] SalaryRecord salaryRecord)
        {
            var result = await _service.AddSalaryRecordAsync(salaryRecord);

            if (result)
            {
                return Ok("Salary record added successfully");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add salary record");
            }
        }
        [HttpGet("all-months")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllMonths()
        {
            var months = await _service.GetAllMonthsAsync();
            return Ok(months);
        }

        [HttpGet("salary-records/{month}/{employeeId}")]
        public async Task<ActionResult<IEnumerable<SalaryRecord>>> GetSalaryRecordsByMonthAndEmployee(string month, int employeeId)
        {
            var salaryRecords = await _service.GetSalaryRecordsByMonthAndEmployeeAsync(month, employeeId);
            return Ok(salaryRecords);
        }

    }
}
