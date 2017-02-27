using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.apiModels
{
    public class ServiceTnt
    {
        //public int ProductId { get; set; }
        //public string productName { get; set; }
        //public string productCode { get; set; }
        //public string releaseDate { get; set; }
        //public int price { get; set; }
        //public string description { get; set; }
        //public int starRating { get; set; }
        //public string imageUrl { get; set; }
        public string Depot_code_1a { get; set; }
        public string Town { get; set; }
        public string From_postcode { get; set; }
        public string To_postcode { get; set; }
        public bool Sobota { get; set; }
        public bool EX9 { get; set; }
        public bool EX10 { get; set; }
        public bool EX12 { get; set; }
        public TimeSpan Priority { get; set; }
        public bool Wieczorne_dostarczenie { get; set; }
        public TimeSpan Standard_delivery_od { get; set; }
        public TimeSpan Standard_delivery_do { get; set; }
        public TimeSpan Pick_up_domestic_zgl { get; set; }
        public TimeSpan? Date_time_pick_up_eksport_sm_zgl { get; set; }
        public bool? Samochod_z_winda_dostepny_w_standardzie { get; set; }
        public TimeSpan? Diplomat_next_day { get; set; }
        public bool? Serwis_podmiejski { get; set; }
        public string Pick_up_domestic_czas { get; set; }
        public string Pick_up_eksport_sm_czas { get; set; }
        public bool? Serwis_miejski { get; set; }
    }   
}

