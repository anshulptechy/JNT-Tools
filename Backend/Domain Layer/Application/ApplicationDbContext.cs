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
            modelBuilder.Entity<SalaryRecord>()
                .HasOne(a => a.Management)
                .WithMany()
                .HasForeignKey(a => a.EmployeeId)
                .IsRequired();
            modelBuilder.Entity<Coupon>().Property(e => e.Discount).HasColumnType("decimal(10, 4)");

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Coupon>()
        .HasIndex(c => c.CouponCode)
        .IsUnique();
        }
        public DbSet<Attendences> Attendence1 { get; set; }


        public DbSet<Screenshots> Screenshot1 { get; set; }


        public DbSet<Login> Login1
        { get; set; }
        public DbSet<Management> Managements1
        {
            get;
            set;
        }
        public DbSet<Coupon> Coupons1 { get; set; }
        public DbSet<projectModel> projectDataTable1
        {
            get;
            set;
        }
        public DbSet<Event> Events1 { get; set; }
        public DbSet<taskStructure> taskTable1 { get; set; }

        public DbSet<SalaryRecord> SalaryRecords1 { get; set;}

 

        public DbSet<ApplyLeave> ApplyLeaves1
        {
            get;
            set;
        }

    }
}
