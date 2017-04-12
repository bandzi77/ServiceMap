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
    public class EmailService: IEmailService
    {
        private IConfiguration configuration;
        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task SendEmailAsync(string formName, string toEmail, string subject, string message)
        {
            var host = configuration["Data:SMTP:host"];
            int port; 
            int.TryParse(configuration["Data:SMTP:port"], out port);
            var emailTNT = configuration["Data:SMTP:email"];
            var passwordTNT = configuration["Data:SMTP:password"];

            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(formName, emailTNT));
            //emailMessage.ReplyTo.Add(new MailboxAddress("", "mariusz-hyla@wp.pl"));
            emailMessage.To.Add(new MailboxAddress("", toEmail));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = message };

            using (var client = new SmtpClient())
            {
                //client.LocalDomain = "tnt.com";
                await client.ConnectAsync(host, port, SecureSocketOptions.None).ConfigureAwait(false);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(emailTNT, passwordTNT);
                await client.SendAsync(emailMessage).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }
    }
}
