using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceMap.Models.apiModels;
using ServiceMap.Models.ServiceTnt;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    public class ServicesTntController : Controller
    {
        //// GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/values/5
        [HttpGet("GetServices")]
        public IActionResult GetServices(string postCode, string cityName, Int16? currentPage)
        {
            var paging = new { totalCount = 3, pageSize = 3 };
            //x => x.productId >= (currentPage ?? 1)

            var serviceTnt = getMockData().ToList();

            for (int i = 0; i < 3; i++)
            {
                serviceTnt.AddRange(serviceTnt);
            }

            var result = new { serviceTnt = serviceTnt, paging = paging };
            return Ok(result);

        }

        [HttpGet("GetDepotDetails")]
        public IActionResult GetDepotDetails(string depotCode)
        {
            var depotDetails = getMockDepotDetails().Where(x => x.DepotCode == depotCode);
            var result = new { depotDetails };
            return Ok(result);
        }


        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}


        private List<DepotDetails> getMockDepotDetails()
        {
            List<DepotDetails> result =
                new List<DepotDetails>()
                {
                    new DepotDetails() {
                        Id = 6,
                        DepotCode = "GDN",
                        AddressesTown = "Gdańsk",
                        AddressesStreet = "ul. Budowlanych 64 C",
                        ExitCustomsOfficeOfficeNumber = "PL 322050",
                        AwkwInfoIsSystemOrDiplomat = 'S',
                        AwkwInfoIsBHPCompliant = true,
                        AwkwInfoSupportingLocation = "GDN",
                        InternationalPackageHoursInfo = "Od 08:00 do 16:00 (tel na recepcje 22 5101 410)",
                        DomesticPackageHoursInfo = "8:00-17:00 - tylko dokumenty i paczki do 30kg",
                        SaturdayPackageHoursInfo = "09:30-10:00, tylko w przypadku opcji SA ( sobotnie doręczenie), brak możliwości odbioru przesyłek z COD",
                        SaturdayOpsHoursInfo = "08:00-12:00 - tel magazzyn 693881401",
                        WeekPackageHoursInfo = "08:00-16:00 na recepcji, między 16-18 na magazynie tylko i wyłącznie paszporty.",
                        CustomsOfficeOfficeNumber = "PL 322050",
                        ExitCustomsOfficeOfficeDesc = "dla przesyłek latających z lotniska w KTW: PL331040",
                        CustomsOfficeOfficeDesc = "Urząd Celny II w Warszawie, oddział celny V w WAW",
                        AddressesPostcode = "55-095",
                        ContactInfo1Phone = "695772583/ PUD J.Mikszewski/tydz.nieparzysty 7-15,po 15 Monika Koscian i Mariusz Wojcieszak",
                        ContactInfo1Extension = "7057 i 7095 grupa kurierów K01-K27   7056 Grupa kurierów k71-k84 (dawna wirazowa)  7922 Grupa kurierów d01-d17 oraz ah01-ah17",
                        ContactInfo1Description = "agenci operacyjni OPS",
                        ContactInfo2Phone = "695772591/  PUD.Monika Koscian Lub 785150592 Mariusz Wojcieszak /tydz.parzysty 7-15,po 15 J.Mikszewski ",
                        ContactInfo2Extension = "693110366 / 695770540 Kierownicy Zmiany PUD",
                        ContactInfo2Description = "691 912 686, 785150406, 695 770 236, 695770414 ",
                        ContactInfo3Phone = "695770516 / OPS (8 - 20)  DYŹUR SOBOTA - Agent OPS nr tel 695770516",
                        ContactInfo3Extension = "7934  Łukasz Gromadka Serwis Miejski 8-16",
                        ContactInfo3Description = "695770564/ 695694844 OPS III zmiana",
                        AfterHoursContactInfo1Phone = "691482867/kierownik zespolu kurierskiego",
                        AfterHoursContactInfo1Extension = "Kierownik PUD 695776281",
                        AfterHoursContactInfo1Description = null,
                        AfterHoursContactInfo2Phone = "22 318 74 28 /Administracja PUD po 17",
                        AfterHoursContactInfo2Extension = "wew 7428",
                        AfterHoursContactInfo2Description = null,
                        AfterHoursContactInfo3Phone = "22 322 09 34/ 22 318 74 27 Dyspozytorzy PUD po 17",
                        AfterHoursContactInfo3Extension = "7934/ 7427",
                        AfterHoursContactInfo3Description = "Katowice Lotnisko Pyrzowice",
                        Name = "Gdańsk",
                        SamedayUndelCutoffTimeInfo = "jeseli dyspozycja wplynie do 07:45 ( na terenie Kielc - moza wyslac taka dyspozycje do 10:00 ) jest szana ze przesylka wyjedzie tego samego dnia . Po tej godzinie kurierow juz nie ma w oddziale"
                    },
                    new DepotDetails() {
                        Id = 6,
                        DepotCode = "GDN",
                        AddressesTown = "Gdańsk",
                        AddressesStreet = "ul.Słowackiego 202a",
                        ExitCustomsOfficeOfficeNumber = "PL 322050",
                        AwkwInfoIsSystemOrDiplomat = 'S',
                        AwkwInfoIsBHPCompliant = true,
                        AwkwInfoSupportingLocation = "GDN",
                        InternationalPackageHoursInfo = "Od 08:00 do 16:00 (tel na recepcje 22 5101 410)",
                        DomesticPackageHoursInfo = "8:00-17:00 - tylko dokumenty i paczki do 30kg",
                        SaturdayPackageHoursInfo = "09:30-10:00, tylko w przypadku opcji SA ( sobotnie doręczenie), brak możliwości odbioru przesyłek z COD",
                        SaturdayOpsHoursInfo = "08:00-12:00 - tel magazzyn 693881401",
                        WeekPackageHoursInfo = "08:00-16:00 na recepcji, między 16-18 na magazynie tylko i wyłącznie paszporty.",
                        CustomsOfficeOfficeNumber = "PL 322050",
                        ExitCustomsOfficeOfficeDesc = "dla przesyłek latających z lotniska w KTW: PL331040",
                        CustomsOfficeOfficeDesc = "Urząd Celny II w Warszawie, oddział celny V w WAW",
                        AddressesPostcode = "55-095",
                        ContactInfo1Phone = "695772583/ PUD J.Mikszewski/tydz.nieparzysty 7-15,po 15 Monika Koscian i Mariusz Wojcieszak",
                        ContactInfo1Extension = "7057 i 7095 grupa kurierów K01-K27   7056 Grupa kurierów k71-k84 (dawna wirazowa)  7922 Grupa kurierów d01-d17 oraz ah01-ah17",
                        ContactInfo1Description = "agenci operacyjni OPS",
                        ContactInfo2Phone = "695772591/  PUD.Monika Koscian Lub 785150592 Mariusz Wojcieszak /tydz.parzysty 7-15,po 15 J.Mikszewski ",
                        ContactInfo2Extension = "693110366 / 695770540 Kierownicy Zmiany PUD",
                        ContactInfo2Description = "691 912 686, 785150406, 695 770 236, 695770414 ",
                        ContactInfo3Phone = "695770516 / OPS (8 - 20)  DYŹUR SOBOTA - Agent OPS nr tel 695770516",
                        ContactInfo3Extension = "7934  Łukasz Gromadka Serwis Miejski 8-16",
                        ContactInfo3Description = "695770564/ 695694844 OPS III zmiana",
                        AfterHoursContactInfo1Phone = "691482867/kierownik zespolu kurierskiego",
                        AfterHoursContactInfo1Extension = "Kierownik PUD 695776281",
                        AfterHoursContactInfo1Description = null,
                        AfterHoursContactInfo2Phone = "22 318 74 28 /Administracja PUD po 17",
                        AfterHoursContactInfo2Extension = "wew 7428",
                        AfterHoursContactInfo2Description = null,
                        AfterHoursContactInfo3Phone = "22 322 09 34/ 22 318 74 27 Dyspozytorzy PUD po 17",
                        AfterHoursContactInfo3Extension = "7934/ 7427",
                        AfterHoursContactInfo3Description = "Katowice Lotnisko Pyrzowice",
                        Name = "Gdańsk Lotnisko",
                        SamedayUndelCutoffTimeInfo = "jeseli dyspozycja wplynie do 07:45 ( na terenie Kielc - moza wyslac taka dyspozycje do 10:00 ) jest szana ze przesylka wyjedzie tego samego dnia . Po tej godzinie kurierow juz nie ma w oddziale"
                    }
                };
            return result;
        }

        private List<ServiceTnt> getMockData()
        {
            var result = new List<ServiceTnt>()
            {
                new ServiceTnt()
                {
                     DepotCode1a = "GDN",
                     Town =  "ABISYNIA",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                },

                new ServiceTnt()
                {
                     DepotCode1a = "GDN",
                     Town =  "Gdańsk",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                },
                new ServiceTnt()
                {
                     DepotCode1a = "KRA",
                     Town =  "Kraków",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = true,
                     EX9 = false,
                     EX10 = false,
                     EX12 =true,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                },
                 new ServiceTnt()
                {
                     DepotCode1a = "WAW",
                     Town =  "WARSZAWA",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                }
            };
            return result;
        }
    }
}
