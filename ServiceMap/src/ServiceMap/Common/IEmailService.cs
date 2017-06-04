using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Common
{
   public interface IEmailService
    {
        Task<bool> SendEmailAsync(string fromName, string CcEmail, string toEmail, string subject, string message, string emailFormat);
        bool SendEmail(string fromName, string CcEmail, string toEmail, string subject, string message, string emailFormat);
    }
}
