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
        public ActionResult<IEnumerable<Screenshots>> GetByid(int id)
        {
            // Retrieve logs based on id from the database
            var logs = _context.Screenshot.Where(s => s.id == id).ToList();

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