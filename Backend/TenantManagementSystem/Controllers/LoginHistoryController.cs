using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginHistoryController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public LoginHistoryController(ApplicationDbContext dbContext)
        {
            _applicationDbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> PostLoginHistory([FromBody] Attendences Attendence, [FromForm] int id)
        {
            try
            {
                // Convert the login and logout times to IST
                TimeZoneInfo istTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime loginTimeIst = TimeZoneInfo.ConvertTimeToUtc((DateTime)Attendence.LoginTime, istTimeZone);
                DateTime logoutTimeIst = TimeZoneInfo.ConvertTimeToUtc((DateTime)Attendence.LogoutTime, istTimeZone);


                // Save login and logout times to the backend
                var LoginHistory = new Attendences
                {
                    id = id,
                    LoginTime = loginTimeIst,
                    LogoutTime = logoutTimeIst,

                };

                // Save login history to the database
                _applicationDbContext.Attendence.Add(Attendence);
                await _applicationDbContext.SaveChangesAsync();

                return Ok("Login history saved successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error saving login history: {ex.Message}");
            }
        }



        [HttpGet]
        public async Task<IActionResult> GetLoginHistories()
        {
            try
            {
                var loginHistories = await _applicationDbContext.Attendence.ToListAsync();

                // Convert the date and time in each login history record to Indian Standard Time (IST)
                foreach (var history in loginHistories)
                {
                    history.LoginTime = ConvertToIST(history.LoginTime);
                    history.LogoutTime = ConvertToIST(history.LogoutTime);
                }

                return Ok(loginHistories);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving login histories: {ex.Message}");
            }
        }

        // Helper method to convert DateTime to IST
        private DateTime ConvertToIST(DateTime dateTime)
        {
            TimeZoneInfo istTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            return TimeZoneInfo.ConvertTimeToUtc(dateTime, istTimeZone);
        }
    }
}
