using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;
using Microsoft.Extensions.Configuration;

namespace ServiceMap.Common
{
    public class EmailService : IEmailService
    {
        private IConfiguration configuration;
        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task<bool> SendEmailAsync(string fromName, string CcEmail, string toEmail, string subject, string message, string emailFormat)
        {

            bool result = false;
#if !DEBUG
            try
            {
                var mimeMsg = CreateEmailMessage(fromName, CcEmail, toEmail, subject, message, emailFormat);
                using (var client = new SmtpClient())
                {
                    client.Connect(mimeMsg.Host, mimeMsg.Port, SecureSocketOptions.None);

                    if (mimeMsg.IsSmtpRequredAuthentication)
                    {
                        client.AuthenticationMechanisms.Remove("XOAUTH2");
                        client.Authenticate(mimeMsg.TntEmail, mimeMsg.Password);
                    }
                    await client.SendAsync(mimeMsg).ConfigureAwait(false);
                    await client.DisconnectAsync(true).ConfigureAwait(false);
                }
                result = true;
            }
            catch
            {
            }
#endif
            return result;

        }


        public bool SendEmail(string fromName, string CcEmail, string toEmail, string subject, string message, string emailFormat)
        {

            bool result = true;
#if RELEASE
            try
            {
                var mimeMsg = CreateEmailMessage(fromName, CcEmail, toEmail, subject, message, emailFormat);
                using (var client = new SmtpClient())
                {
                    //client.LocalDomain = "tnt.com";
                    client.Connect(mimeMsg.Host, mimeMsg.Port, SecureSocketOptions.None);

                    if (mimeMsg.IsSmtpRequredAuthentication)
                    {
                        client.AuthenticationMechanisms.Remove("XOAUTH2");
                        client.Authenticate(mimeMsg.TntEmail, mimeMsg.Password);
                    }
                    client.Send(mimeMsg);
                    client.Disconnect(true);
                }
            }
            catch
            {
                result = false;
            }
#endif
            return result;
        }

        private ExtMimeMessage CreateEmailMessage(string fromName, string CcEmail, string toEmail, string subject, string message, string emailFormat)
        {
            
            int port;
            int.TryParse(configuration["Data:SMTP:port"], out port);

            bool isSmtpRequredAuthentication;
            bool.TryParse(configuration["Data:SMTP:isSmtpRequredAuthentication"], out isSmtpRequredAuthentication);

            var emailMessage = new ExtMimeMessage(configuration["Data:SMTP:host"], port, configuration["Data:SMTP:email"], configuration["Data:SMTP:password"],isSmtpRequredAuthentication);

            emailMessage.From.Add(new MailboxAddress(fromName, emailMessage.TntEmail));
            if (!String.IsNullOrWhiteSpace(CcEmail))
            {
                emailMessage.Cc.Add(new MailboxAddress("", CcEmail));
            }

            emailMessage.To.Add(new MailboxAddress("", toEmail));
            emailMessage.Subject = subject;
            emailMessage.Body = String.IsNullOrWhiteSpace(emailFormat) ? new TextPart("plain") { Text = message } : new TextPart(emailFormat) { Text = message };

            return emailMessage;
        }

        private class ExtMimeMessage : MimeMessage
        {
            public readonly string Host;
            public readonly int Port;
            public readonly string TntEmail;
            public readonly string Password;
            public readonly bool IsSmtpRequredAuthentication;

            public ExtMimeMessage(string host, int port, string tntEmail, string password, bool isSmtpRequredAuthentication)
            {
                this.Host = host;
                this.Port = port;
                this.TntEmail = tntEmail;
                this.Password = password;
                this.IsSmtpRequredAuthentication = isSmtpRequredAuthentication;
            }
        }

    }
}
