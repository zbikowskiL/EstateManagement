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
    [Route("api/Property")]
    public class PropertyController : Controller
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly IOwnerRepository _ownerRepository;

        public PropertyController(IPropertyRepository propertyRepository, IAddressRepository addressRepository, IOwnerRepository ownerRepository)
        {
            _propertyRepository = propertyRepository;
            _addressRepository = addressRepository;
            _ownerRepository = ownerRepository;
        }

        //GET: /api/property/getproperty?propertyId=1

        [HttpGet("[action]")]
        public IActionResult GetProperty(int propertyId)
        {
            if (propertyId <= 0)
            {
                return BadRequest("PropertyId can't be less than 0.");
            }
            return new JsonResult(_propertyRepository.GetProperty(propertyId));
        }

        //GET /api/property/getallproperties

        [HttpGet("[action]")]
        public IActionResult GetAllProperties()
        {
            return new JsonResult(_propertyRepository.GetAllProperties());
        }

        //POST
        [HttpPost("[action]")]
        public IActionResult AddProperty([FromBody]Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var owner = _ownerRepository.GetOwner(property.OwnerId);
            if (owner == null)
            {
                return NotFound("Can't find owner with provided ownerId.");
            }

            var address = _addressRepository.GetAddress(property.AdressId);
            if (address == null)
            {
                return NotFound("Can't find owner with provided addressId.");
            }

            _propertyRepository.AddProperty(property, address, owner);
            return new JsonResult(property.Id);
        }

        [HttpPost("[action]")]
        public IActionResult UpdateProperty([FromBody]Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _propertyRepository.UpdateProperty(property);
            return new JsonResult(property.Id);
        }

        [HttpGet("[action]")]
        public IActionResult DeleteProperty(int propertyId)
        {
            if (propertyId <= 0)
            {
                return BadRequest("PropertyId can't be less than 0.");
            }

            var property = _propertyRepository.GetProperty(propertyId);
            if (property == null)
            {
                return NotFound($"Can't find property with provided propertyId: {propertyId}.");
            }

            //var owner = _ownerRepository.GetOwner(property.OwnerId);
            //if (owner == null)
            //{
            //    return NotFound($"Can't find owner with provided ownerId: {property.OwnerId}.");
            //}

            //var address = _addressRepository.GetAddress(property.AdressId);
            //if (address == null)
            //{
            //    return NotFound($"Can't find address with provided addressId: {property.AdressId}.");
            //}

            _propertyRepository.DeleteProperty(property);
            return new JsonResult(property.Id);
        }
        
    }

}