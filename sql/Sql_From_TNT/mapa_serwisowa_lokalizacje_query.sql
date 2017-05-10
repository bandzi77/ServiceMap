SELECT 
	   [DepotCode] as 'Kod depotu'
      ,[Addresses_Town] as 'Miasto'
	  ,[Addresses_Postcode] as 'Kod pocztowy'
      ,[Addresses_Street] as 'Ulica'
      ,[InternationalPackageHours_Info] as 'Nadanie przesy�ek lotniczych'
      ,[DomesticPackageHours_Info] as 'Nadanie przesy�ek drogowych'
      ,[SaturdayPackageHours_Info] as 'Odbi�r w soboty'
	  ,[PassportPickupHours_Info] as 'Odbi�r paszport�w'
	  ,[WeekPackageHours_Info] as 'Odbi�r przesy�ek w tygodniu'
 
  FROM [MS].[dbo].[Locations]
  WHERE [DepotCode]  <> 'WA2'