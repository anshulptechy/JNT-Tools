using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ISignupService<Signup> _customService;
        private readonly ApplicationDbContext _applicationDbContext;

        public UsersController(ISignupService<Signup> SignupService, ApplicationDbContext applicationDbContext)
        {
            _customService = SignupService;
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet(nameof(GetAccountById))]
        public IActionResult GetAccountById(int Id)
        {
            var obj = _customService.Get(Id);
            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }

        [HttpGet(nameof(GetAllAccounts))]
        public IActionResult GetAllAccounts()
        {
            var obj = _customService.GetAll();

            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }

        [HttpGet(nameof(IsEmailRegistered))]
        public IActionResult IsEmailRegistered(string email)
        {
            var isEmailRegistered = _applicationDbContext.Signup.Any(u => u.Email == email);
            return Ok(isEmailRegistered);
        }

        [HttpPost(nameof(CreateAccount))]
        public IActionResult CreateAccount(Signup signup)
        {
            if (signup != null)
            {
                _customService.Insert(signup);
                return Ok(new { message = "Created Successfully" });
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpPut(nameof(Update))]
        public IActionResult Update(Signup signup)
        {
            if (signup != null)
            {
                _customService.Update(signup);
                return Ok("Updated Successfully");
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var signup = _customService.DeleteSignup(id);
            return Ok(signup);
        }
    }
}

