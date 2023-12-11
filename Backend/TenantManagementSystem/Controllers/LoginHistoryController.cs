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

                _dbContext.Attendence.Add(loginHistory);
                await _dbContext.SaveChangesAsync();

                return Ok(); // You can customize the response if needed
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to save login and logout times. Error: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetLoginHistories()
        {
            try
            {
                var loginHistories = await _dbContext.Attendence.ToListAsync();

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

