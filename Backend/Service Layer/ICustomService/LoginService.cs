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
    public class LoginService : ILoginService
    {
        private readonly ILoginRepo _loginRepository;
        

        public LoginService(ILoginRepo loginRepo)
        {
            _loginRepository = loginRepo;
            
        }

        public async Task<Login> Get(string email, string password)
        {
            var user = await _loginRepository.Get(email, password);

            if (user != null)
            {
                return user;
            }
          
                else
                {
                    return null;
                }
            }
        }
    
}
