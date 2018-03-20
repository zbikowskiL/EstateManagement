using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models
{
    public class TypeRatioReport
    {
        public int Houses { get; set; }
        public int Flats { get; set; }
    }

    public class PropertyPerCityRatioReport
    {
        public string City { get; set; }
        public int Amount { get; set; }
    }
    
}
