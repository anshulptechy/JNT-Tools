using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    public class projectCrudAndReport : Controller
    {
        private readonly IProjectService<projectModel> _customService;
        private readonly ApplicationDbContext _applicationDbContext;
        public projectCrudAndReport(IProjectService<projectModel> TableProjectsService, ApplicationDbContext applicationDbContext)
        {
            _customService = TableProjectsService;
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet(nameof(GetProjectsById))]
        public IActionResult GetProjectsById(int Id)
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
        [HttpGet(nameof(GetAllProjects))]
        public IActionResult GetAllProjects()
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

        [HttpGet(nameof(GetAllProjectNames))]
        public IActionResult GetAllProjectNames()
        {
            var obj = _customService.GetAllProjectNames();
            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                // Modify the response to include both ProjectId and ProjectName
                var response = obj.Select(p => new { ProjectId = p.ProjectId, ProjectName = p.ProjectName });
                return Ok(response);
            }
        }


        [HttpGet("projectsByMonth/{month}")]
        public IActionResult GetProjectsByMonth(int month)
        {
            var projects = _customService.GetProjectsByMonth(month);

            if (projects != null)
            {
                return Ok(projects);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpPost(nameof(Create))]
        public IActionResult Create([FromBody] projectModel project)
        {
            if (project != null)
            {
                _customService.Insert(project);
                return Ok(project);
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpPut(nameof(Update))]
        public IActionResult Update([FromBody] projectModel project)
        {
            if (project != null)
            {
                _customService.Update(project);
                return Ok(project);
            }
            else
            {
                return BadRequest();
            }
        }
    }

}