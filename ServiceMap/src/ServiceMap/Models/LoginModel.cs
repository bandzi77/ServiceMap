using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage ="Email jest wymagany")]
        [UIHint("email")]
        [EmailAddress(ErrorMessage = "Niepoprawny format adresu email")]
        public string Email { get; set; }
        [Required(ErrorMessage ="Hasło jest wymagane")]
        [UIHint("password")]
        [Display(Name ="Hasło")]
        public string Password { get; set; }
    }
}
