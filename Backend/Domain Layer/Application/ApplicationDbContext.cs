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
        protected override void OnModelCreating(ModelBuilder builder)
        {
<<<<<<< HEAD
            base.OnModelCreating(builder);
=======
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
>>>>>>> 739c2da74b9f6d36176bb93b2df8cd106412da5d
        }
        public DbSet<Management> Managements
        {
            get;
            set;
        }
<<<<<<< HEAD
=======
        public DbSet<Coupon> Coupons { get; set; }
>>>>>>> 739c2da74b9f6d36176bb93b2df8cd106412da5d
        public DbSet<projectModel> projectDataTable
        {
            get;
            set;
        }
        public DbSet<Event> Events { get; set; }
        public DbSet<taskStructure> taskTable3 { get; set; }

<<<<<<< HEAD
=======
        public DbSet<SalaryRecord> SalaryRecords { get; set;}

 

        public DbSet<ApplyLeave> ApplyLeaves
        {
            get;
            set;
        }
>>>>>>> 739c2da74b9f6d36176bb93b2df8cd106412da5d

    }
}
