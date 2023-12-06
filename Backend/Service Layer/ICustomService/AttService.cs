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
    public class AttService : IAttService<Attendences>
    {
        private readonly IAttRepository<Attendences> _AttendenceRepository;
        public AttService(IAttRepository<Attendences> AttendenceRepository)
        {
            _AttendenceRepository = AttendenceRepository;
        }

        public IAttRepository<Attendences>? AttendenceRepository
        {
            get; private set;
        }
        public IEnumerable<Attendences> GetAttendanceByMonth(string month)
        {
            return _AttendenceRepository.GetAttendenceByMonth(month);
        }

        public IEnumerable<Attendences> GetAttendanceByEmployeeName(string employeeName)
        {
            return _AttendenceRepository.GetAttendanceByEmployeeName(employeeName);
        }
        public async Task<IEnumerable<string>> GetAllEmployeeNames()
        {
            return await _AttendenceRepository.GetAllEmployeeNames();
        }
        public async Task<IEnumerable<string>> GetAllMonthsAsync()
        {
            return await _AttendenceRepository.GetAllMonthsAsync();
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
        public Attendences? Get(int EmpId)
        {
            try
            {
                var obj = _AttendenceRepository.Get(EmpId);
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
    }
}
