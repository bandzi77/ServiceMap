using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Common
{
   public interface IEmailService
    {
        Task SendEmailAsync(string formName, string toEmail, string subject, string message);
    }
}
