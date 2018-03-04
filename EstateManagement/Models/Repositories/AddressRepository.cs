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
        public int AddAddress(Address address)
        {
            if (address == null)
            {
                throw new Exception("Address object can't be null.");
            }

            _databaseContext.Addresses.Add(address);
            _databaseContext.SaveChanges();

            return address.AddressId;
            
        }

        //GET
        public Address GetAddress(int addressId)
        {
            if (addressId <= 0)
            {
                throw new Exception("AddressId can't be less than 0.");
            }

            return _databaseContext.Addresses.FirstOrDefault(address => address.AddressId == addressId);
            
        }


        public int UpdateAddress(Address address)
        {
            if (address == null)
            {
                throw new Exception("Object Address can't be null.");
            }

            _databaseContext.Addresses.Update(address);
            _databaseContext.SaveChanges();

            return address.AddressId;

        }

        List<Address> IAddressRepository.GetAllAddresses()
        {
            return _databaseContext.Addresses.ToList();
        }
    }
}
