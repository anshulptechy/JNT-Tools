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
        private readonly IScreenshotService<Screenshots> _screenshotService;
        private readonly ApplicationDbContext _applicationDbContext;

        public ScreenshotController(IScreenshotService<Screenshots> screenshotService, ApplicationDbContext context)
        {
            _screenshotService = screenshotService;
            _applicationDbContext = context;
        }


        [HttpGet("GetByUserId/{userId}")]
        public ActionResult<IEnumerable<Screenshots>> GetByUserId(int userId)
        {
            // Retrieve logs based on UserId from the database
            var logs = _applicationDbContext.Screenshot.Where(s => s.UserId == userId).ToList();

            if (logs == null || logs.Count == 0)
            {
                return NotFound(); // Return 404 if no logs are found
            }

            return Ok(logs); // Return the logs if found
        }

        [HttpPost]
        public async Task<IActionResult> PostScreenshot([FromForm] IFormFile file, [FromForm] int userId)

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
                        UserId = userId // Associate the screenshot with the Signup based on UserId
                    };

                    _applicationDbContext.Screenshot.Add(screenshot);
                    await _applicationDbContext.SaveChangesAsync();

                    return Ok($"Screenshot saved with Id: {screenshot.Id}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

