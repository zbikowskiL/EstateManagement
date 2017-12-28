using EstateManagement.Models.DataBase;
using EstateManagement.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DatabaseContext _databaseContext;

        public PropertyRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        //CREATE
        public Property AddProperty(Property property)
        {

            throw new Exception();

            
        }

        //READ
        public Property GetProperty(int propertyId)
        {
            return _databaseContext.Properties.Where(property => property.Id == propertyId).FirstOrDefault();
        }
        public List<Property> GetAllProperties()
        {
            return _databaseContext.Properties.ToList();
        }
        
        //UPDATE
        public Property EditProperty(Property property)
        {
            throw new NotImplementedException();
        }
        
        //DELETE
        public void DeleteProperty(int propertyId)
        {
            Property property = _databaseContext.Properties.Find(propertyId);
            
            if (property == null)
            {
                throw new Exception($"Nie ma nieruchomości o id: '{propertyId}'.");
            }
            _databaseContext.Properties.Find(propertyId);
            _databaseContext.Properties.Remove(property);

        }

    }
}
