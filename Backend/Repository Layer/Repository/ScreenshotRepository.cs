using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.Repository
{
    public class ScreenshotRepository<T> : IScreenshotRepository<T> where T : Screenshots
    {
        #region property
        private readonly ApplicationDbContext _appDbContext;
        private readonly DbSet<T> entities;
        #endregion
        #region Constructor
        public ScreenshotRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            entities = _appDbContext.Set<T>();
        }
        #endregion
        public void Delete(int Id)
        {
            var result = _appDbContext.Screenshot.FirstOrDefault(l => l.Id == Id);
            if (result != null)
            {
                _appDbContext.Screenshot.Remove(result);
                _appDbContext.SaveChanges();
            }
        }
        public T Get(int Id)
        {
            return entities.SingleOrDefault(c => c.Id == Id);
        }
        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            _appDbContext.SaveChanges();
        }

        public void SaveChanges()
        {
            _appDbContext.SaveChanges();

        }
    }
}
