using EstateManagement.Models.DataBase;
using EstateManagement.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
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
        //public Property AddProperty(Property property)
        public void AddProperty(Property property)
        {
            _databaseContext.Properties.Add(property);
            
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
        public void EditProperty(Property property)
        {
            _databaseContext.Entry(property).State = EntityState.Modified;
        }
        
        //DELETE
        public void DeleteProperty(int propertyId)
        {
            Property property = _databaseContext.Properties.Find(propertyId);
            _databaseContext.Properties.Remove(property);
            
        }

        public void SaveChangesInDatabase()
        {
            _databaseContext.SaveChanges();
        }

    }
}
