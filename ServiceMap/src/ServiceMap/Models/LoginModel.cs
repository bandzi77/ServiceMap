using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models
{
    public class LoginModel
    {
        [Required]
        public string Login { get; set; }
        [UIHint("password")]
        public string Password { get; set; }

        public string ReturnUrl { get; set; }
    }
}
