using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.User
{
    public class User
    {
        [Required]
        public int _Id { get; set; }
        [Required]
        public string Email { get; set; }
        [RegularExpression("(?=.*\\d)(?=.*[_a-z])(?=.+[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\+\\-\\=])(?!.*\\s).{8,12}")]
        [Required]
        public string Password { get; set; }
        [Required]
        public bool IsSuperUser { get; set; }
        [Required]
        public bool IsLocked { get; set; }
        public int? LimitOfRequestsPerDay { get; set; }
        public int? NumberOfRequestsPerDay { get; set; }
        //NumOfReqstPerDay
    }
}
