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

        public PropertyController(IPropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        // GET: /api/getproperty?propertyId=1

        [HttpGet("[action]")]
        public IActionResult GetProperty(int propertyId)
        {
            return new JsonResult(_propertyRepository.GetProperty(propertyId));
        }

        //GET /api/getallproperties

        [HttpGet("[action]")]
        public IActionResult GetAllProperties()
        {
            return new JsonResult(_propertyRepository.GetAllProperties());
        }

        //POST: /api/Property/AddProperty
        [HttpPost("[action]")]
        public IActionResult AddProperty([FromBody] Property property)
        {
                if (ModelState.IsValid)
                {
                    _propertyRepository.AddProperty(property);
                    _propertyRepository.SaveChangesInDatabase();
                    return RedirectToAction("GetAllProperties");
                }
            return new JsonResult(_propertyRepository.GetAllProperties());
        }

        //[HttpPost("[action]")]
        //public IActionResult AddProperty([FromBody] Property property)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            _propertyRepository.AddProperty(property);
        //            _propertyRepository.SaveChangesInDatabase();
        //            return RedirectToAction("GetProperties");
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        throw new Exception("Something went wrong wit Added new Property: /PropertyControllerAddProperty/");
        //    }
        //    return new JsonResult(_propertyRepository.GetAllProperties());
        //}

        // HTTP DELETE: /api/Property/DeleteProperty

        [HttpDelete("[action]")]
        public IActionResult DeleteProperty(int propertyId)
        {
            try
            {
                if (propertyId != 0)
                {
                    Property property = _propertyRepository.GetProperty(propertyId);
                    _propertyRepository.DeleteProperty(propertyId);
                    _propertyRepository.SaveChangesInDatabase();
                    return RedirectToAction("GetAllProperties");
                }
               
            }
            catch (Exception)
            {

                throw new Exception($"Something went wrong with delete property. Check action /PropertyController/Deleteproperty/");
                
            }

            return new JsonResult(_propertyRepository.GetAllProperties());

        }

        // HTTP POST: /api/Property/UpdateProperty

        [HttpPost("[action]")]
        
        public IActionResult UpdateProperty([FromBody]Property property)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _propertyRepository.EditProperty(property);
                    _propertyRepository.SaveChangesInDatabase();
                    return RedirectToAction("GetAllProperties");
                }
            }
            catch (Exception)
            {

                throw new Exception($"Could not be update Property about id: '{property.Id}'. ");
            }

            return new JsonResult(_propertyRepository.GetAllProperties());
        }
    }
}