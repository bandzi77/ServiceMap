using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceMap.Models.Service_Tnt;

namespace ServiceMap.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        :base(options){ }

        public virtual DbSet<ServiceTnt> ServiceTnt { get; set; }
        public virtual DbSet<Blog> Blog { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ServiceTnt>().
                HasKey(k => new { k.Town, k.FromPostcode, k.ToPostcode });
        }

    }
}
