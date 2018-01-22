using EstateManagement.Models.DataBase;
using EstateManagement.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly DatabaseContext _databaseContext;

        public AddressRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        //CREATE
        public int AddAddress(Adress address)
        {
            if (address == null)
            {
                throw new Exception("Address object can't be null.");
            }

            _databaseContext.Adresses.Add(address);
            _databaseContext.SaveChanges();

            return address.AdressId;
            
        }

        //GET
        public Adress GetAddress(int addressId)
        {
            if (addressId <= 0)
            {
                throw new Exception("AddressId can't be less than 0.");
            }

            return _databaseContext.Adresses.FirstOrDefault(address => address.AdressId == addressId);
            
        }
    }
}
