using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccesses
{
    public class SalaryContext : DbContext
    {
        public SalaryContext(DbContextOptions<SalaryContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<SalaryHead> SalaryHeads { get; set; }
        public DbSet<SalaryLine> SalaryLines { get; set; }

    }
}