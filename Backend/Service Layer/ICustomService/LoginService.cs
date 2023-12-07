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
        private readonly ISignupService<Signup> _signupService;

        public LoginService(ILoginRepo loginRepo, ISignupService<Signup> signupService)
        {
            _loginRepository = loginRepo;
            _signupService = signupService;
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
                var signupUser = await _signupService.GetByEmailAndPasswordAsync(email, password);

                if (signupUser != null)
                {
                    // Create a new Login object with UserId
                    var login = new Login
                    {
                        Email = signupUser.Email,
                        Password = signupUser.Password,
                        UserId = signupUser.UserId // Set UserId here
                    };

                    return login;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
