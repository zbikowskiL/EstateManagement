using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models
{
    public class Property
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public PropertyType Type { get; set; }
        public string Description { get; set; }
        
        public int Rooms { get; set; }
        public int Area { get; set; }

        public bool Washer { get; set; }
        public bool Refrigerator { get; set; }
        public bool Iron { get; set; }

       
        public virtual int AdressId { get; set; }
        public virtual Adress Adress { get; set; }

      
        public virtual int OwnerId { get; set; }
        public virtual Owner Owner { get; set; }

    }

    public enum PropertyType
    {
        House = 0,
        Flat = 1

    }
}
