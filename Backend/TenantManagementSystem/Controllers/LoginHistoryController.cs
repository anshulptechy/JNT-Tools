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

    public async Task<ActionResult<Attendances>> PostLoginHistory(Attendances loginHistory)

        {

            try

            {

                // Convert local times to UTC

                loginHistory.LoginTime = DateTime.UtcNow;

                loginHistory.LogoutTime = DateTime.UtcNow;

                // Set the Hours property to "00:00:00"
                loginHistory.Hours = TimeSpan.Zero;


                _dbContext.Attendance.Add(loginHistory);

                await _dbContext.SaveChangesAsync();

                //return Ok();

                return Ok(loginHistory.AttendanceId);// You can customize the response if needed

            }

            catch (Exception ex)

            {

                return BadRequest($"Failed to save login and logout times. Error: {ex.Message}");

            }

        }

        [HttpPut("{AttendanceId}")]

        public async Task<IActionResult> UpdateLogoutTime(int AttendanceId)

        {

            try

            {

                var loginHistory = await _dbContext.Attendance.FindAsync(AttendanceId);

                if (loginHistory == null)

                {

                    return NotFound($"Login history with ID {AttendanceId} not found.");

                }

                // Check if the elapsed time is more than twelve hours

                TimeSpan elapsed = DateTime.UtcNow - loginHistory.LoginTime;

                if (elapsed.TotalHours <= 12)

                {

                    loginHistory.LogoutTime = DateTime.UtcNow;

                    await _dbContext.SaveChangesAsync();


                    return Ok($"Logout time updated for login history with ID {AttendanceId}.");

                }

                else

                {

                    return Ok($"Logout time not updated for login history with ID {AttendanceId}.");

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

                var loginHistories = await _dbContext.Attendance.ToListAsync();


                // Convert the date and time in each login history record to Indian Standard Time (IST)

                foreach (var history in loginHistories)

                {

                    history.LoginTime = ConvertUtcToIst(history.LoginTime);

                    history.LogoutTime = ConvertUtcToIst(history.LogoutTime);

                }

                return Ok(loginHistories);

            }

            catch (Exception ex)

            {

                return BadRequest($"Error retrieving login histories: {ex.Message}");

            }

        }

        // Helper method to convert DateTime to IST

        private DateTime ConvertUtcToIst(DateTime utcTime)
        {
            TimeZoneInfo indianTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, indianTimeZone);
            return indianTime;
        }

    } }

