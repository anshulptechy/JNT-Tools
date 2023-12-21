using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;
using System.Globalization;
using System;
using Microsoft.EntityFrameworkCore;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceController : ControllerBase
    {

        private readonly IAttService<Attendences> _AttendenceServices;

        private readonly ApplicationDbContext _applicationDbContext;
        private readonly Attendences Attendence;
        public AttendenceController(IAttService<Attendences> AttendenceServices, ApplicationDbContext appDbContext)
        {
            _AttendenceServices = AttendenceServices;
            _applicationDbContext = appDbContext;
        }
        [HttpGet(nameof(GetAttendenceById))]
        public IActionResult GetAttendenceById(int EmpId)
        {
            var obj = _AttendenceServices.Get(EmpId);
            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }
        private object GetAttendenceById()
        {
            throw new NotImplementedException();
        }

        [HttpGet(nameof(GetAllAttendence))]
        public IActionResult GetAllAttendence()
        {
            try
            {

                var records = _AttendenceServices.GetAll();


                _AttendenceServices.CalculateHours(records);


                return Ok(records);
            }
            catch (Exception ex)
            {

                return BadRequest($"Error retrieving or calculating hours: {ex.Message}");
            }
        }


        [HttpPost(nameof(CreateAttendence))]
        public IActionResult CreateAttendence(Attendences Attendence)
        {
            if (Attendence != null)
            {
                _AttendenceServices.Insert(Attendence);
                return Ok("Created Successfully");
            }
            else
            {
                return BadRequest("Somethingwent wrong");
            }

        }


        [HttpPut(nameof(UpdateAttendence))]
        public IActionResult UpdateAttendence(Attendences Attendence)
        {
            if (Attendence != null)
            {
                _AttendenceServices.Update(Attendence);
                return Ok("Updated SuccessFully");
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete(nameof(DeleteAttendence))]
        public IActionResult DeleteAttendence(Attendences Attendence)
        {
            if (Attendence != null)
            {
                _AttendenceServices.Delete(Attendence);
                return Ok("Deleted Successfully");
            }
            else
            {
                return BadRequest("Something went wrong");
            }

        }
        [HttpGet(nameof(GetAllManagementAndAttendance))]
        public IActionResult GetAllManagementAndAttendance()
        {
            try
            {
                List<Management> allManagements = _applicationDbContext.Managements.ToList();

                var result = new List<object>();

                foreach (Management management in allManagements)
                {
                    List<Attendences> attendance = _AttendenceServices.GetAttendanceByManagementId(management.id);

                    if (attendance != null && attendance.Any())
                    {
                        foreach (var attendanceRecord in attendance)
                        {
                            var entry = new
                            {
                                Management = management,
                                Attendance = attendanceRecord
                            };

                            result.Add(entry);
                        }
                    }
                }

                // Extract the Attendences objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendences>().ToList();
                _AttendenceServices.CalculateHours(attendancesList);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving all management and attendance entries: {ex.Message}");
            }
        }
        [HttpGet(nameof(GetAllManagementAndAttendanceByMonthbytenantName))]
        public IActionResult GetAllManagementAndAttendanceByMonthbytenantName(string tenantName, string monthName)
        {
            try
            {
                // Fetch all data from the database for the specified tenant
                List<Management> allManagements = _applicationDbContext.Managements
                    .Where(m => m.tenantName == tenantName)
                    .ToList();

                // Filter data based on the specified month
                List<object> result = new List<object>();

                foreach (var management in allManagements)
                {
                    List<Attendences> attendance = _AttendenceServices.GetAttendanceByManagementIdAndMonth(management.id, monthName);

                    if (attendance != null && attendance.Any())
                    {
                        foreach (var attendanceRecord in attendance)
                        {
                            var entry = new
                            {
                                Management = management,
                                Attendance = attendanceRecord
                            };

                            result.Add(entry);
                        }
                    }
                }

                // Extract the Attendences objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendences>().ToList();
                _AttendenceServices.CalculateHours(attendancesList);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving management and attendance entries by month: {ex.Message}");
            }
        }


        [HttpGet(nameof(GetAllManagementAndAttendanceByMonth))]
        public IActionResult GetAllManagementAndAttendanceByMonth(string monthName)
        {
            try
            {
                // Fetch all data from the database
                List<Management> allManagements = _applicationDbContext.Managements.ToList();

                // Filter data based on the specified month
                List<object> result = new List<object>();

                foreach (var management in allManagements)
                {
                    var attendance = _AttendenceServices.GetAttendanceByManagementIdAndMonth(management.id, monthName);

                    if (attendance != null)
                    {
                        // Replace "attendence" with "attendances" in the anonymous object
                        result.Add(new
                        {
                            Management = management,
                            Attendance = attendance // Change the key here
                        });
                    }
                }

                // Extract the Attendences objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendences>().ToList();
                _AttendenceServices.CalculateHours(attendancesList);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving management and attendance entries by month: {ex.Message}");
            }
        }
        [HttpGet(nameof(GetAllFirstNamesByTenant))]
        public IActionResult GetAllFirstNamesByTenant(string tenantName)
        {
            try
            {
                List<string> allFirstNames = _applicationDbContext.Managements
                    .Where(m => m.tenantName == tenantName)
                    .Select(m => m.firstName)
                    .Distinct()
                    .ToList();

                return Ok(allFirstNames);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving first names for tenant '{tenantName}': {ex.Message}");
            }
        }


        [HttpGet(nameof(GetAllFirstNames))]
        public IActionResult GetAllFirstNames()
        {
            try
            {
                List<string> allFirstNames = _applicationDbContext.Managements
                    .Select(m => m.firstName)
                    .Distinct()
                    .ToList();

                return Ok(allFirstNames);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving all first names: {ex.Message}");
            }
        }

        [HttpGet("months")]
        public IActionResult GetMonths()
        {
            try
            {
                // Fetch attendance data from the database
                var attendances = _applicationDbContext.Attendence.ToList();

                // Extract month names
                List<string> monthNames = new List<string>();
                foreach (var attendance in attendances)
                {
                    string monthName = attendance.LoginTime.ToString("MMMM");
                    monthNames.Add(monthName);
                }

                return Ok(monthNames);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet(nameof(GetAllManagementAndAttendanceByFirstName))]
        public IActionResult GetAllManagementAndAttendanceByFirstName(string firstName, string tenantName)
        {
            try
            {
                // Fetch all data from the database for the specified firstName and tenantName
                List<Management> allManagements = _applicationDbContext.Managements
                    .Where(m => m.firstName == firstName && m.tenantName == tenantName)
                    .ToList();

                List<object> result = new List<object>();

                foreach (var management in allManagements)
                {
                    // Assuming you have a method to get attendance by management ID
                    List<Attendences> attendance = _AttendenceServices.GetAttendanceByManagementId(management.id);

                    if (attendance != null && attendance.Any())
                    {
                        foreach (var attendanceRecord in attendance)
                        {
                            var entry = new
                            {
                                Management = management,
                                Attendance = attendanceRecord
                            };

                            result.Add(entry);
                        }
                    }
                }

                // Extract the Attendences objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendences>().ToList();
                _AttendenceServices.CalculateHours(attendancesList);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving management and attendance entries by firstName: {ex.Message}");
            }
        }

    }
}
