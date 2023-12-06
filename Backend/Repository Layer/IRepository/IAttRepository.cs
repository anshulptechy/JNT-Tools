using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface IAttRepository<T> where T : Attendences
    {

        IEnumerable<T> GetAll();
        T Get(int EmpId);
        IEnumerable<Attendences> GetAttendenceByMonth(string month);
        Task<IEnumerable<string>> GetAllMonthsAsync();
        IEnumerable<Attendences> GetAttendanceByEmployeeName(string employeeName);
        Task<IEnumerable<string>> GetAllEmployeeNames();


        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        void SaveChanges();
    }
}
