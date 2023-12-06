using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;
using System.Globalization;
using System;
using Domain_Layer.Application;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreenshotController : ControllerBase
    {
        private readonly IScreenshotService<Screenshots> _screenshotService;
        private readonly ApplicationDbContext _appDbContext;

        public ScreenshotController(IScreenshotService<Screenshots> screenshotService, ApplicationDbContext context)
        {
            _screenshotService = screenshotService;
            _appDbContext = context;
        }


        [HttpGet("GetById/{EmpId}")]
        public ActionResult<IEnumerable<Screenshots>> GetByEmpId(int EmpId)
        {
            // Retrieve logs based on SignupId from the database
            var logs = _appDbContext.Screenshot.Where(s => s.EmpId == EmpId).ToList();

            if (logs == null || logs.Count == 0)
            {
                return NotFound(); // Return 404 if no logs are found
            }

            return Ok(logs); // Return the logs if found
        }
        [HttpGet(nameof(GetAll))]
        public IActionResult GetAll()
        {
            var obj = _screenshotService.GetAll();

            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }
        [HttpDelete("Delete/{EmpId}")]
        public IActionResult Delete(int EmpId)
        {
            var screenshot = _screenshotService.DeleteScreenshot(EmpId);
            return Ok(screenshot);
        }


        [HttpGet("GetByEmpId/{EmpId}")]
        public ActionResult<IEnumerable<Screenshots>> GetById(int EmpId)
        {
            // Retrieve logs based on SignupId from the database
            var logs = _appDbContext.Screenshot.Where(s => s.EmpId == EmpId).ToList();

            if (logs == null || logs.Count == 0)
            {
                return NotFound(); // Return 404 if no logs are found
            }

            return Ok(logs); // Return the logs if found
        }

        [HttpPost]
        public async Task<IActionResult> PostScreenshot([FromForm] IFormFile file, [FromForm] int EmpId)

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

                    // Assuming Screenshots is an interface and ScreenshotsImplementation is a class implementing it
                    var screenshot = new Screenshots
                    {
                        ImageData = memoryStream.ToArray(),
                        CreatedAt = indianTime,
                        EmpId = EmpId
                    };

                    _appDbContext.Screenshot.Add(screenshot);
                    await _appDbContext.SaveChangesAsync();

                    return Ok($"Screenshot saved with Id: {screenshot.EmpId}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
