using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Employee
    {
        public Employee()
        {
            Documents = new HashSet<Document>();
        }
        public int Id { get; set; }
        public string NationalId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Document> Documents { get; set; }
    }
}