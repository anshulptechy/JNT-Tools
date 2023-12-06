using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.Custom_Service
{
    public interface IScreenshotService<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(int Id);
        void Insert(T entity);
        //void Update(T entity);
        bool DeleteScreenshot(int Id);


    }
}
