using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;
using System.Globalization;
using System;
using Domain_Layer.Application;
using Microsoft.EntityFrameworkCore;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreenshotController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScreenshotController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetByid/{id}")]
        public ActionResult<IEnumerable<Screenshots>> GetByid(int id, [FromQuery] string filter = "All")
        {
            // Retrieve logs based on id and filter from the database
            var logsQuery = _context.Screenshot.Where(s => s.id == id);

            if (filter == "Today")
            {
                // Filter for today
                logsQuery = logsQuery.Where(s => s.CreatedAt.Date == DateTime.UtcNow.Date);
            }
            else if (filter == "ThisWeek")
            {
                // Filter for this week
                var today = DateTime.UtcNow.Date;
                var startDate = today.AddDays(-(int)today.DayOfWeek);
                var endDate = startDate.AddDays(6);
                logsQuery = logsQuery.Where(s => s.CreatedAt.Date >= startDate && s.CreatedAt.Date <= endDate);
            }

            var logs = logsQuery.ToList();

            if (logs == null || logs.Count == 0)
            {
                return NotFound(); // Return 404 if no logs are found
            }

            return Ok(logs); // Return the logs if found
        }

        [HttpPost]
        public async Task<IActionResult> PostScreenshot([FromForm] IFormFile file, [FromForm] int id)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid image data");
            }

            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);

                    // Convert UTC time to Indian Standard Time (IST)
                    TimeZoneInfo indianTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                    DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, indianTimeZone);

                    var screenshot = new Screenshots
                    {
                        ImageData = memoryStream.ToArray(),
                        CreatedAt = indianTime,
                        id = id // Associate the screenshot with the Signup based on id
                    };

                    _context.Screenshot.Add(screenshot);
                    await _context.SaveChangesAsync();

                    return Ok($"Screenshot saved with Id: {screenshot.id}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}