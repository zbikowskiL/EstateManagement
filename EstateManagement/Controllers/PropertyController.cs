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

        [HttpGet("[action]")]
        public IActionResult GetProperties()
        {
            return new JsonResult(_propertyRepository.GetAllProperties());
        }

        [HttpPost("[action]")]
        public IActionResult AddProperty([FromBody] Property property)
        {
            return NotFound();
        }

        [HttpDelete("[action]")]
        public IActionResult DeleteProperty(int propertyId)
        {
            try
            {
               _propertyRepository.DeleteProperty(propertyId);
                
            }
            catch (Exception)
            {

                throw ;
            }

           return NoContent();

        } 
    }
}