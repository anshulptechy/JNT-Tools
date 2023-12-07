using Domain_Layer.Models;
using Repository_Layer.IRepository;
using Service_Layer.Custom_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public class ScreenshotService : IScreenshotService<Screenshots>
    {
        private readonly IScreenshotRepository<Screenshots> _ScreenshotRepository;
        public ScreenshotService(IScreenshotRepository<Screenshots> ScreenshotRepository)
        {
            _ScreenshotRepository = ScreenshotRepository;
        }

        public IScreenshotRepository<Screenshots>? ScreenshotRepository
        {
            get; private set;
        }

        public bool DeleteScreenshot(int id)
        {

            try
            {
                _ScreenshotRepository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }


        public Screenshots Get(int id)
        {
            try
            {
                var obj = _ScreenshotRepository.Get(id);
                if (obj != null)
                {
                    return obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IEnumerable<Screenshots> GetAll()
        {
            try
            {
                var obj = _ScreenshotRepository.GetAll();
                if (obj != null)
                {
                    return obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void Insert(Screenshots entity)
        {
            try
            {
                if (entity != null)
                {
                    _ScreenshotRepository.Insert(entity);
                    _ScreenshotRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
