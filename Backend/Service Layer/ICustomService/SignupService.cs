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
    public class SignupService : ISignupService<Signup>
    {
        #region Property
        private readonly ISignupRepo<Signup> _signupRepository;
        #endregion
        #region Constructor
        public SignupService(ISignupRepo<Signup> SignupRepo)
        {
            _signupRepository = SignupRepo;
        }
        #endregion
        public bool DeleteSignup(string Id)
        {

            try
            {
                _signupRepository.Delete(Convert.ToInt32(Id));
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }


        public Signup Get(int Id)
        {
            try
            {
                var obj = _signupRepository.Get(Id);
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
        public IEnumerable<Signup> GetAll()
        {
            try
            {
                var obj = _signupRepository.GetAll();
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

        public async Task<Signup> GetByEmailAndPasswordAsync(string email, string password)
        {
            Signup signupUser = await _signupRepository.GetByEmailAndPasswordAsync(email, password);
            return signupUser;
        }

        public void Insert(Signup entity)
        {
            try
            {
                if (entity != null)
                {
                    _signupRepository.Insert(entity);
                    _signupRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(Signup entity)
        {
            try
            {
                if (entity != null)
                {
                    _signupRepository.Update(entity);
                    _signupRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
