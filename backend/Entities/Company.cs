using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Company
    {
        public Company()
        {
            Documents = new HashSet<Document>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string TradeName { get; set; }
        public string UidNumber { get; set; }
        public string VatNumber { get; set; }

        public ICollection<Document> Documents { get; set; }
    }
}