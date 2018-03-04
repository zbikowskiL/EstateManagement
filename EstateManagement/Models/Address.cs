using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models
{
    public class Address
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AddressId { get; set; }

        public string Street { get; set; }
        public string City { get; set; }

    }
}
