using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface ISignupRepo<T> where T : Signup
    {
        IEnumerable<T> GetAll();
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(int Id);
        void SaveChanges();
        Task<T> GetByEmailAndPasswordAsync(string email, string password);
    }

}
