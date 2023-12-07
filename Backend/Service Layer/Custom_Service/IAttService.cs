using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.Custom_Service
{
    public interface IAttService<T> where T : class
    {
        IEnumerable<T> GetAll();
      
        void CalculateHours(IEnumerable<Attendences> records);
        T Get(int id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);

    }
}
