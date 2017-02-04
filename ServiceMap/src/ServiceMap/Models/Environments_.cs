using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ServiceMap.Models
{
    public class Environments_ : IEnvironments
    {
        private string _roleSuperuser;
        private string _roleUser;
        public Environments_(IConfiguration configuration)
        {
            _roleSuperuser = configuration["Data:Roles:Superuser"];
            _roleUser = configuration["Data:Roles:User"];
        }


       public string roleSuperuser
        {
            get
            {
                return _roleSuperuser;
            }
        }

        public string roleUser
        {
            get
            {
                return _roleUser;
            }
        }
    }
}
