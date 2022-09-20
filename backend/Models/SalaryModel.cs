using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Models
{
    public class SalaryModel
    {
        public SalaryHead SalaryHead { get; set; }
        public List<SalaryLine> SalaryLines { get; set; }
    }
}