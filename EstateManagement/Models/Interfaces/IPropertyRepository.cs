using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Interfaces
{
    public interface IPropertyRepository
    {
        List<Property> GetAllProperties();
        void AddProperty(Property property);  //Property AddProperty(Property property);
        Property GetProperty(int propertyId);
        void EditProperty(Property property);
        void DeleteProperty(int propertyId);
        void SaveChangesInDatabase();
    }
}
