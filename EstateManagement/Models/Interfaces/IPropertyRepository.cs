using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Interfaces
{
    public interface IPropertyRepository
    {
        List<Property> GetAllProperties();
        Property GetProperty(int propertyId);
        int AddProperty(Property property, Adress adress, Owner owner);
        int UpdateProperty(Property property);
        //void DeleteProperty(Property property, Adress adress, Owner owner);
        void DeleteProperty(Property property);

    }
}
