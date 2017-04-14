using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Common
{
    public class ConstsData
    {
        public static readonly string PasswordForNewUserSubject = "TNT - Twoje hasło";
        public static readonly string PasswordForNewUserMsg = "Drogi Użytkowniku!\n\n   Twoje hasło do aplikacji w systemie TNT to: ";
        public static readonly string ResetLinkPasswordSubject = "Reset hasła";
        public static readonly string ResetLinkPasswordMsg = "Drogi Użytkowniku!\n\n    Poniżej znajdziesz link pozwalający na zresetowanie hasła w aplikacji Mapa Serwisowa:\n\n ";
        public static readonly string ResetLinkWrongEmail = "1. Wystąpił błąd podczas resetowania hasła";
        public static readonly string ResetLinkWrongToken = "2. Wystąpił błąd podczas resetowania hasła";
        

        public const string EmailValidationMsg = "Niepoprawny format adresu email";
        public const string EmailRequiredMsg = "Email jest wymagany";
        public const string EmailRegExpMsg = "Dopuszczalne znaki specjalne w email prefix: '.' '_' '%' '+' '-'";
        public const string EmailRegExp = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+";
        public const string PasswordRequiredMsg = "Hasło jest wymagane";
        public const string PasswordRegExpMsg = "Hasło nie spełnia wymagań";
        public const string PasswordConfirmRequiredMsg = "Potwierdzenie hasła jest wymagane";
        public const string PasswordConfirmRegExpMsg = "Potwierdzenie hasła nie spełnia wymagań";
        public const string PasswordRegExp = "(?=.*\\d)(?=.*[a-zA-Z])(?=.+[_\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}";
        public const string TokenValidationMsg = "Niepopawny link odzyskiwania hasła";
        public static readonly string DifferencesPasswordMsg = "Podane hasła są różne";

    }
}
