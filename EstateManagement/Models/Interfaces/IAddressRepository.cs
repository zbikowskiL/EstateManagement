using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Interfaces
{
    public interface IAddressRepository
    {
        int AddAddress(Adress adress);
        Adress GetAddress(int addressId);
    }
}
