using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class SalaryHead
    {
        public SalaryHead()
        {
            SalaryLines = new HashSet<SalaryLine>();
        }

        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }

        public Company Company { get; set; }

        public ICollection<SalaryLine> SalaryLines { get; set; }
    }
}