SELECT 
	   [DepotCode] as 'Kod depotu'
      ,[Addresses_Town] as 'Miasto'
	  ,[Addresses_Postcode] as 'Kod pocztowy'
      ,[Addresses_Street] as 'Ulica'
      ,[InternationalPackageHours_Info] as 'Nadanie przesy³ek lotniczych'
      ,[DomesticPackageHours_Info] as 'Nadanie przesy³ek drogowych'
      ,[SaturdayPackageHours_Info] as 'Odbiór w soboty'
	  ,[PassportPickupHours_Info] as 'Odbiór paszportów'
	  ,[WeekPackageHours_Info] as 'Odbiór przesy³ek w tygodniu'
 
  FROM [MS].[dbo].[Locations]
  WHERE [DepotCode]  <> 'WA2'