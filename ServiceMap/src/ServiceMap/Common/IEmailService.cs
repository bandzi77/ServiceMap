using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Common
{
   public interface IEmailService
    {
        void SendEmailAsync(string formName, string toEmail, string subject, string message);
    }
}
