using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateManagement.Models;
using EstateManagement.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EstateManagement.Controllers
{
    [Produces("application/json")]
    [Route("api/Addresses")]
    public class AddressesController : Controller
    {
        private readonly IAddressRepository _addressRepository;

        public AddressesController(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }


        //GET  /api/addresses/getalladdresses
        [HttpGet("[action]")]
        public IActionResult GetAllAddresses()
        {
            return new JsonResult(_addressRepository.GetAllAddresses());
        }

        //GET /api/addresses/getaddress?addressId=1
        [HttpGet("[action]")]
        public IActionResult GetAddress(int addressId)
        {
            if (addressId <= 0)
            {
                return BadRequest($"Can't find address with provided addresId: {addressId}");
            }

            return new JsonResult(_addressRepository.GetAddress(addressId));

        }

        //POST api/addresses/addaddress
        [HttpPost("[action]")]
        public IActionResult AddAddress([FromBody]Adress address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _addressRepository.AddAddress(address);
            return new JsonResult(address.AdressId);
        }

        [HttpPut("[action]")]
        public IActionResult UpdateAddress([FromBody]Adress adress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _addressRepository.UpdateAddress(adress);
            return new JsonResult(adress.AdressId);
        }

        
    }
}