using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models
{
    public class ForgotPasswordModel
    {
        [Required(ErrorMessage = "Email jest wymagany")]
        [EmailAddress(ErrorMessage = "Niepoprawny format adresu email")]
        [RegularExpression("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+")]
        [UIHint("email")]
        public string Email { get; set; }
    }
}
