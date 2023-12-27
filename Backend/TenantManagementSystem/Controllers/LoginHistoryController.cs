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
        private readonly ApplicationDbContext _dbContext;

        public LoginHistoryController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public async Task<ActionResult<Attendences>> PostLoginHistory(Attendences loginHistory)
        {
            try
            {

                _dbContext.Attendence1.Add(loginHistory);
                await _dbContext.SaveChangesAsync();

                //return Ok();
                return Ok(loginHistory.AttendenceId);// You can customize the response if needed
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to save login and logout times. Error: {ex.Message}");
            }
        }
        [HttpPut("{attendenceId}")]
        public async Task<IActionResult> UpdateLogoutTime(int attendenceId)
        {
            try
            {
                var loginHistory = await _dbContext.Attendence1.FindAsync(attendenceId);

                if (loginHistory == null)
                {
                    return NotFound($"Login history with ID {attendenceId} not found.");
                }

                // Check if the elapsed time is more than twelve hours
                TimeSpan elapsed = DateTime.Now - loginHistory.LoginTime;

                if (elapsed.TotalHours <= 12)
                {
                    loginHistory.LogoutTime = DateTime.Now;
                    await _dbContext.SaveChangesAsync();

                    return Ok($"Logout time updated for login history with ID {attendenceId}.");
                }
                else
                {
                    return Ok($"Logout time not updated for login history with ID {attendenceId}.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating logout time: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetLoginHistories()
        {
            try
            {
                var loginHistories = await _dbContext.Attendence1.ToListAsync();

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

