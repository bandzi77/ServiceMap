using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models
{
    public class ResetPasswordModel
    {
        [Required(ErrorMessage = "Email jest wymagany")]
        [UIHint("email")]
        [EmailAddress(ErrorMessage = "Niepoprawny format adresu email")]
        [RegularExpression("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane")]
        [UIHint("password")]
        [RegularExpression("(?=.*\\d)(?=.*[a-zA-Z])(?=.+[_\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}")]
        [Display(Name = "Hasło")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Potwierdzenie hasła jest wymagane")]
        [UIHint("password")]
        [RegularExpression("(?=.*\\d)(?=.*[a-zA-Z])(?=.+[_\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}")]
        [Display(Name = "Potwierdź hasło")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
