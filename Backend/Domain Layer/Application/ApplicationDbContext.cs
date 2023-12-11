using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Application
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Management> Managements
        {
            get;
            set;
        }

        public DbSet<Attendences> Attendence
        {
            get;
            set;
        }
        public DbSet<Screenshots> Screenshot { get; set; }

        public DbSet<projectModel> projectDataTable

        {
            get;
            set;
        }


        public DbSet<Login> Login
        {  get; set; }

       

        public DbSet<Event> Events { get; set; }
        public DbSet<taskStructure> taskTable3 { get; set; }
   


    }
}
