using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.Repository
{
    public class AttRepository<T> : IAttRepository<T> where T : Attendences
    {
        #region property
        private readonly ApplicationDbContext _appDbContext;
        private readonly DbSet<T> entities;
        #endregion
        #region Constructor
        public AttRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            entities = _appDbContext.Set<T>();
        }
        #endregion
        public IEnumerable<Attendences> GetAttendenceByMonth(string month)
        {
            try
            {
                // Parse the month name to a DateTime object
                DateTime parsedDate = DateTime.ParseExact(month, "MMMM", CultureInfo.CurrentCulture);

                return _appDbContext.AttendenceRecord
                    .Where(a => a.Date != null && a.Date.Value.Month == parsedDate.Month)
                    .ToList();
            }
            catch (FormatException)
            {
                // Handle the case where parsing the month string to DateTime fails
                throw new ArgumentException("Invalid month format. Please provide a valid month name.");
            }
        }
        public IEnumerable<Attendences> GetAttendanceByEmployeeName(string employeeName)
        {
            return _appDbContext.AttendenceRecord
                .Where(a => a.EmpName == employeeName)
                .ToList();
        }
        public async Task<IEnumerable<string>> GetAllEmployeeNames()
        {
            return await _appDbContext.AttendenceRecord
                .Select(e => e.EmpName)
                .ToListAsync();
        }
        public async Task<IEnumerable<string>> GetAllMonthsAsync()
        {
            var orderedMonths = await _appDbContext.Set<T>()
                .Select(x => x.month)
                .Distinct()
                .ToListAsync();

            var monthOrder = new Dictionary<string, int>
        {
            { "January", 1 },
            { "February", 2 },
            { "March", 3 },
            { "April", 4 },
            { "May", 5 },
            { "June", 6 },
            { "July", 7 },
            { "August", 8 },
            { "September", 9 },
            { "October", 10 },
            { "November", 11 },
            { "December", 12 }
        };

            orderedMonths = orderedMonths.OrderBy(m => monthOrder.GetValueOrDefault(m, int.MaxValue)).ToList();

            return orderedMonths;
        }




        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            entities.Remove(entity);
            _appDbContext.SaveChanges();
        }
        public T Get(int EmpId)
        {
            return entities.SingleOrDefault(x => x.EmpId == EmpId);
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            entities.Add(entity);
            _appDbContext.SaveChanges();
        }
        public void SaveChanges()
        {
            _appDbContext.SaveChanges();
        }
        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            entities.Update(entity);
            _appDbContext.SaveChanges();
        }

    }
}
