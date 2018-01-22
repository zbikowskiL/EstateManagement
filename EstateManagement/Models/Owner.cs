using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models
{
    public class Owner
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OwnerId { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }

    }
}
