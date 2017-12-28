using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Interfaces
{
    public interface IPropertyRepository
    {
        List<Property> GetAllProperties();
        Property AddProperty(Property property);
        Property GetProperty(int propertyId);
        Property EditProperty(Property property);
        void DeleteProperty(int propertyId);
    }
}
