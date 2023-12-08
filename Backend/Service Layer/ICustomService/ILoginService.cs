﻿using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface ILoginService
    {
        Task<Login> Get(string email, string password);
    }

}