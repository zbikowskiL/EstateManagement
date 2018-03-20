using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateManagement.Models.Interfaces;
using EstateManagement.Models.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EstateManagement.Controllers
{
    [Produces("application/json")]
    [Route("api/Reports")]
    public class ReportsController : Controller
    {
        private readonly IReportRepository _reportRepository;

        public ReportsController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpGet("[action]")]
        public IActionResult GetTypesRatioReport()
        {
            return new JsonResult(_reportRepository.GetTypesRatio());
        }

        [HttpGet("[action]")]
        public IActionResult GetPropertiesPerCity()
        {
            return new JsonResult(_reportRepository.GetPropertiesPerCity());
        }
    }
}