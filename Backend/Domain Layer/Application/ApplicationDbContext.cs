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
            modelBuilder.Entity<Coupon>().Property(e => e.Discount).HasColumnType("decimal(10, 4)");

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Coupon>()
        .HasIndex(c => c.CouponCode)
        .IsUnique();
        }
        public DbSet<Management> Managements
        {
            get;
            set;
        }
        public DbSet<Coupon> Coupons { get; set; }

    }
}
