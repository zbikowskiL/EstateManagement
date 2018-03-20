using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Interfaces
{
    public interface IReportRepository
    {
        TypeRatioReport GetTypesRatio();
        List<PropertyPerCityRatioReport> GetPropertiesPerCity();
    }
}
