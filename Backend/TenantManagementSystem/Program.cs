using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.EventRepo;
using Repository_Layer.IEventRepo;
using Repository_Layer.IRepository;

using Repository_Layer.ProjectRepo;


using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Repository_Layer.EventRepo;
using Repository_Layer.IEventRepo;
using Repository_Layer.IRepository;
using Repository_Layer.ProjectRepo;


using Repository_Layer.Repository;
using Service_Layer.Custom_Service;
using Service_Layer.EventService;
using Service_Layer.ICustomService;
using Service_Layer.IEventService;
using static Repository_Layer.IRepository.IRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Sqlconnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add repository to the container

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));


// Add services to the container.

builder.Services.AddScoped<ICustomService<Management>, Custom_Service>();

builder.Services.AddScoped(typeof(IAttRepository<>), typeof(AttRepository<>));
builder.Services.AddScoped<IAttService<Attendences>, AttService>();


builder.Services.AddScoped(typeof(IProjectRepo<>), typeof(ProjectRepo<>));



builder.Services.AddScoped(typeof(TaskInterface1<>), typeof(TaskRepository<>));
builder.Services.AddScoped<TaskServiceInterface1<taskStructure>, TaskService>();




builder.Services.AddScoped<IProjectService<projectModel>, ProjectService>();
builder.Services.AddScoped(typeof(IEventRepo<>), typeof(EventRepo<>));
builder.Services.AddScoped<IEventService<Event>, EventService>();




builder.Services.AddScoped<ILoginRepo, LoginRepo>();
builder.Services.AddScoped<ILoginService, LoginService>();

builder.Services.AddScoped<IApplyLeaveService<ApplyLeave>, ApplyLeaveService>();

builder.Services.AddScoped(typeof(IApplyLeaveRepo<>), typeof(ApplyLeaveRepo<>));



builder.Services.AddScoped(typeof(ISalaryReport<>), typeof(SalaryReport<>));
builder.Services.AddScoped<ISalaryService, SalaryService>();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
