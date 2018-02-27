using EstateManagement.Models.DataBase;
using EstateManagement.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {

        private readonly DatabaseContext _databaseContext;

        public OwnerRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        //CREAT
        public int AddOwner(Owner owner)
        {
            if (owner == null)
            {
                throw new Exception("Owner object can't be null.");
            }

            _databaseContext.Add(owner);
            _databaseContext.SaveChanges();

            return owner.OwnerId;

        }

        public List<Owner> GetAllOwners()
        {
            return _databaseContext.Owners.ToList();
        }

        //GET
        public Owner GetOwner(int ownerId)
        {
            if (ownerId <= 0)
            {
                throw new Exception("OwnerId can't be less than 0.");
            }

            return _databaseContext.Owners.FirstOrDefault(owner => owner.OwnerId == ownerId);
        }

        public int UpdateOwner(Owner owner)
        {
            if (owner == null)
            {
                throw new Exception("Object owner can't be null.");
            }

            _databaseContext.Owners.Update(owner);
            _databaseContext.SaveChanges();

            return owner.OwnerId;
        }
    }
}
