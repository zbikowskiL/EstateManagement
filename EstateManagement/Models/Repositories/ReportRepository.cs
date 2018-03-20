using EstateManagement.Models.DataBase;
using EstateManagement.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateManagement.Models.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly DatabaseContext _databaseContext; 

        public ReportRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public TypeRatioReport GetTypesRatio()
        {
            return new TypeRatioReport
            {
                Flats = _databaseContext.Properties.Where(prop => prop.Type == PropertyType.Flat).Count(),
                Houses = _databaseContext.Properties.Where(prop => prop.Type == PropertyType.House).Count()
            };
        }

        public List<PropertyPerCityRatioReport> GetPropertiesPerCity()
        {
            return _databaseContext.Properties
                .GroupBy(key => key.Address.City)
                .Select(o => new PropertyPerCityRatioReport()
                {
                    City = o.Key,
                    Amount = o.Where(s => s.Address.City == o.Key).Count()
                }).ToList();
        }

    }
}
