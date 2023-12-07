using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;
using System.Globalization;
using System;

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
            try
            {
                if (Attendence != null)


                {
                    // Assuming UserId in Attendence corresponds to the Id in Management
                    var management = _applicationDbContext.Managements.FirstOrDefault(Managements => Managements.id == Attendence.id);

                    if (management != null)
                    {
                        _AttendenceServices.Insert(Attendence);
                        return Ok("Created Successfully");
                    }
                    else
                    {
                        return NotFound("Management not found");
                    }
                }
                else
                {
                    return BadRequest("Invalid Attendence data");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating attendence: {ex.Message}");
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
        [HttpPost(nameof(CreateManagementAndAttendance))]
        public IActionResult CreateManagementAndAttendance(Management management)
        {
            try
            {
                if (management != null)
                {
                    _applicationDbContext.Managements.Add(management);
                    _applicationDbContext.SaveChanges();

                    Attendences newAttendanceEntry = new Attendences
                    {
                        id = management.id,
                        LoginTime = DateTime.Now,
                        LogoutTime = DateTime.Now.AddHours(8), // Adjust this as needed
                        Hours = TimeSpan.FromHours(8) // Adjust this as needed
                    };

                    _AttendenceServices.Insert(newAttendanceEntry);

                    return Ok("User created successfully with attendance entry.");
                }
                else
                {
                    return BadRequest("Invalid Management data");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating user and attendance: {ex.Message}");
            }
        }

    }
}
