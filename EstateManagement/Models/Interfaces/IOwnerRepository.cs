using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Interfaces
{
    public interface IOwnerRepository
    {
        int AddOwner(Owner owner);
        Owner GetOwner(int ownerId);
    }
}
