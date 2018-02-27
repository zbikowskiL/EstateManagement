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
        public int AddProperty(Property property, Adress adress, Owner owner)
        {
            if (property == null)
            {
                throw new Exception("Property object can't be null.");
            }
            if (adress == null)
            {
                throw new Exception("Address object can't be null.");
            }
            if (owner == null)
            {
                throw new Exception("Owner object can't be null.");
            }

            property.Id = 0;
            property.Owner = owner;
            property.OwnerId = owner.OwnerId;

            property.Adress = adress;
            property.AdressId = adress.AdressId;
            _databaseContext.Properties.Add(property);
            _databaseContext.SaveChanges();

            return property.Id;
        }

        //READ && GET
        public Property GetProperty(int propertyId)
        {
            if (propertyId <= 0)
            {
                throw new Exception("PropertyId can't be less than 0.");
            }
            return _databaseContext.Properties.Where(
                    property => property.Id == propertyId).FirstOrDefault();
        }

        public List<Property> GetAllProperties()
        {
            return _databaseContext.Properties.ToList();
        }

        //UPDATE
        public int UpdateProperty(Property property)
        {
            if (property == null)
            {
                throw new Exception("Property object can't be null.");
            }

            _databaseContext.Properties.Update(property);
            _databaseContext.SaveChanges();

            return property.Id;
        }

        //DELETE
        //public void DeleteProperty(Property property, Adress adress, Owner owner)
        public void DeleteProperty(Property property)
        {
            if (property == null)
            {
                throw new Exception("Property object can't be null.");
            }

            //if (adress == null)
            //{
            //    throw new Exception("Address object can't be null.");
            //}
            //if (owner == null)
            //{
            //    throw new Exception("Owner object can't be null.");
            //}

            _databaseContext.Properties.Remove(property);
            _databaseContext.SaveChanges();

            //_databaseContext.Adresses.Remove(adress);
            //_databaseContext.SaveChanges();

            //_databaseContext.Owners.Remove(owner);
            //_databaseContext.SaveChanges();
            
        }
    }
}
