using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models
{
    public interface IEnvironments
    {
        string roleSuperuser { get; }
        string roleUser { get; }
    }
}
