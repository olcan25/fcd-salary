using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class SalaryLine
    {
        public int Id { get; set; }
        public int SalaryHeadId { get; set; }
        public int EmployeeId { get; set; }
        public decimal NetSalary { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal EmployeeContribute { get; set; }
        public decimal EmployerContribute { get; set; }
        public decimal TaxSalary { get; set; }
        public bool IsPrimary { get; set; }

        public SalaryHead SalaryHead { get; set; }
    }
}