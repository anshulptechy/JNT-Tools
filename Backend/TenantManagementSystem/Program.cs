using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using Repository_Layer.Repository;
using Service_Layer.Custom_Service;
using Service_Layer.ICustomService;
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
//inject dependency
builder.Services.AddScoped(typeof(IAttRepository<>), typeof(AttRepository<>));
builder.Services.AddScoped<IAttService<Attendences>, AttService>();
builder.Services.AddScoped(typeof(IScreenshotRepository<>), typeof(ScreenshotRepository<>));
builder.Services.AddScoped<IScreenshotService<Screenshots>, ScreenshotService>();


builder.Services.AddScoped(typeof(IScreenshotRepository<>), typeof(ScreenshotRepository<>));
builder.Services.AddScoped<IScreenshotService<Screenshots>, ScreenshotService>();

builder.Services.AddScoped(typeof(ISignupRepo<>), typeof(SignupRepo<>));
builder.Services.AddScoped<ISignupService<Signup>, SignupService>();

builder.Services.AddScoped<ILoginRepo, LoginRepo>();
builder.Services.AddScoped<ILoginService, LoginService>();

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
