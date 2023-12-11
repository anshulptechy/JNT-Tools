using Domain_Layer.Application;
using Domain_Layer.Models;
using Repository_Layer.IRepository;
using Service_Layer.ICustomService;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.Custom_Service
{
    public class AttService : IAttService<Attendences>
    {
        private readonly IAttRepository<Attendences> _AttendenceRepository;
        private readonly ApplicationDbContext _applicationDbContext;

        public AttService(IAttRepository<Attendences> AttendenceRepository, ApplicationDbContext applicationDbContext)
        {
            _AttendenceRepository = AttendenceRepository;
            _applicationDbContext = applicationDbContext;
        }
        public IAttRepository<Attendences>? AttendenceRepository
        {
            get; private set;
        }


        public void Delete(Attendences entity)
        {
            try
            {
                if (entity != null)
                {
                    _AttendenceRepository.Delete(entity);
                    _AttendenceRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Attendences GetAttendanceByManagementIdAndMonth(int id, string monthName)
        {
            // Parse the month name to get the corresponding integer
            int targetMonth = DateTime.ParseExact(monthName, "MMMM", CultureInfo.InvariantCulture).Month;

            var res= _applicationDbContext.Attendence
                .FirstOrDefault(a => a.id == id && a.LoginTime.Month == targetMonth);

            return res;
        }

      

        public Attendences? Get(int UserId)
        {
            try
            {
                var obj = _AttendenceRepository.Get(UserId);
                if (obj != null)
                {
                    return (Attendences)obj;
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
        public IEnumerable<Attendences>? GetAll()
        {

            try
            {
                var obj = _AttendenceRepository.GetAll();
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
        public List<Attendences> GetAllAttendances()
        {
           
            return _applicationDbContext.Attendence.ToList();
        }
        public void CalculateHours(IEnumerable<Attendences> records)
        {
            foreach (var record in records)
            {
                if (record.LogoutTime != null && record.LoginTime != null)
                {
                    // Ensure that both LogoutTime and LoginTime are DateTime objects
                    if (record.LogoutTime is DateTime logoutTime && record.LoginTime is DateTime loginTime)
                    {
                        // If LogoutTime is before 12 PM, add 12 hours to make it PM
                        if (loginTime.Hour != logoutTime.Hour)
                        {
                            if (logoutTime.Hour < 12)
                            {
                                logoutTime = logoutTime.AddHours(12);
                            }
                            record.Hours = logoutTime - loginTime;

                        }
                        if (loginTime.Hour == logoutTime.Hour)
                        {

                            record.Hours = logoutTime - loginTime;

                        }
                        else
                        {
                            // Set Hours to 00:00:00
                            record.Hours = TimeSpan.Zero;
                        }

                        // Calculate hours for the entire day (from 12 AM to 11:59 PM)
                        record.Hours = logoutTime - loginTime;
                    }
                    else
                    {
                        record.Hours = null;
                    }
                }
                else
                {
                    record.Hours = null;
                }
            }
        }
        public void Insert(Attendences entity)
        {
            try
            {
                if (entity != null)
                {
                    _AttendenceRepository.Insert(entity);
                    _AttendenceRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(Attendences entity)
        {
            try
            {
                if (entity != null)
                {
                    _AttendenceRepository.Update(entity);
                    _AttendenceRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Attendences> GetAttendanceByManagementId(int id)
        {
            return _applicationDbContext.Attendence
                .Where(a => a.id == id)
                .ToList();
        }

        public void CreateManagementUserAndAttendance(Management management)
        {
            // Add the new user to the Management table
            _applicationDbContext.Managements.Add(management);
            _applicationDbContext.SaveChanges();

            // Create a corresponding entry in the Attendences table
            Attendences attendance = new Attendences
            {
                id = management.id,
                LoginTime = DateTime.Now,
                LogoutTime = DateTime.Now, // Set as needed
                Hours = TimeSpan.Zero // Set as needed
            };

            _applicationDbContext.Attendence.Add(attendance);
            _applicationDbContext.SaveChanges();
        }
    }
}

