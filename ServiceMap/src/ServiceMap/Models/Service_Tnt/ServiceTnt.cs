using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.Service_Tnt
{

    public partial class Blog
    {
        public int BlogId { get; set; }
        public string Url { get; set; }

   }
    public class ServiceTnt
    {
        public string DepotCode { get; set; }
        public string Town { get; set; }
        public string FromPostcode { get; set; }
        public string ToPostcode { get; set; }
        public bool Sobota { get; set; }
        public bool EX9 { get; set; }
        public bool EX10 { get; set; }
        public bool EX12 { get; set; }
        public TimeSpan? Priority { get; set; }
        public bool? WieczorneDostarczenie { get; set; }
        public TimeSpan? StandardDeliveryOd { get; set; }
        public TimeSpan? StandardDeliveryDo { get; set; }
        public TimeSpan? PickUpDomesticZgl { get; set; }
        public TimeSpan? DateTimePickUpEksportSmZgl { get; set; }
        public bool? SamochodZwindaDostepnyWstandardzie { get; set; }
        public TimeSpan? DiplomatNextDay { get; set; }
        public bool? SerwisMiejski { get; set; }
        public bool? SerwisPodmiejski { get; set; }
        public Single? PickUpDomesticCzas { get; set; }
        public Single? PickUpEksportSmCzas { get; set; }
        public long RowNumber { get; set; }
        public int TotalCount { get; set; }
    }


    public class Test
    {
        public string DepotCode { get; set; }
        public string Town { get; set; }
        public string FromPostcode { get; set; }
        public string ToPostcode { get; set; }
      

    }
}

