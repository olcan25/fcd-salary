using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Document
    {
        public int Id { get; set; }
        public string Path { get; set; }

        public Company Company { get; set; }
        public Employee Employee { get; set; }
    }
}