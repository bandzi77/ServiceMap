﻿using Microsoft.EntityFrameworkCore;
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

        public DbSet<ServiceTnt> ServicesTnt { get; }
    }
}
