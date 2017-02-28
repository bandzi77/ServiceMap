﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.ServiceTnt
{
    public class Depots
    {
        public Int16 ID { get; set; }
        public string DepotCode { get; set; }
        public string AddressesTown { get; set; }
        public string AddressesStreet { get; set; }
        public string ExitCustomsOfficeOfficeNumber { get; set; }
        public char AWKWInfoIsSystemOrDiplomat { get; set; }
        public bool AWKWInfoIsBHPCompliant { get; set; }
        public string AWKWInfoSupportingLocation { get; set; }
        public string InternationalPackageHoursInfo { get; set; }
        public string DomesticPackageHoursInfo { get; set; }
        public string SaturdayPackageHoursInfo { get; set; }
        public string SaturdayOpsHoursInfo { get; set; }
        public string WeekPackageHoursInfo { get; set; }
        public string CustomsOfficeOfficeNumber { get; set; }
        public string ExitCustomsOfficeOfficeDesc { get; set; }
        public string CustomsOfficeOfficeDesc { get; set; }
        public string AddressesPostcode { get; set; }
        public string ContactInfo1Phone { get; set; }
        public string ContactInfo1Extension { get; set; }
        public string ContactInfo1Description { get; set; }
        public string ContactInfo2Phone { get; set; }
        public string ContactInfo2Extension { get; set; }
        public string ContactInfo2Description { get; set; }
        public string ContactInfo3Phone { get; set; }
        public string ContactInfo3Extension { get; set; }
        public string ContactInfo3Description { get; set; }
        public string AfterHoursContactInfo1Phone { get; set; }
        public string AfterHoursContactInfo1Extension { get; set; }
        public string AfterHoursContactInfo1Description { get; set; }
        public string AfterHoursContactInfo2Phone { get; set; }
        public string AfterHoursContactInfo2Extension { get; set; }
        public string AfterHoursContactInfo2Description { get; set; }
        public string AfterHoursContactInfo3Phone { get; set; }
        public string AfterHoursContactInfo3Extension { get; set; }
        public string AfterHoursContactInfo3Description { get; set; }
        public string Name { get; set; }
        public string SamedayUndelCutoffTimeInfo { get; set; }
    }
}
