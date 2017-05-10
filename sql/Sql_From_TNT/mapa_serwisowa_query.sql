/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [Town]
      ,[From_Postcode]
      ,[To_Postcode]
      ,[Depot_code-1a]
	  ,CASE WHEN (RIGHT([Service_area_code-1],1)) = 'S' 
	  THEN '1' ELSE '0' END AS 'Sobota'
	  ,CASE WHEN (RIGHT([Service_area_code-1],3)) LIKE ('%09%') 
	  THEN '1' ELSE '0' END AS 'EX9'
	  ,CASE 
	  WHEN (RIGHT([Service_area_code-1],3)) LIKE ('%09%') 
	  THEN '1'
	  WHEN (RIGHT([Service_area_code-1],3)) LIKE ('%10%')
	  THEN '1' ELSE '0' END AS 'EX10'
	  ,CASE 
	  WHEN (RIGHT([Service_area_code-1],3)) LIKE ('%09%') 
	  THEN '1'
	  WHEN (RIGHT([Service_area_code-1],3)) LIKE ('%10%')
	  THEN '1'
	  WHEN (RIGHT([Service_area_code-1],3)) LIKE ('%12%')
	  THEN '1' ELSE '0' END AS 'EX12'


      ,LEFT(CAST ([Priority] AS time),5) AS 'Priority'
      ,[Wieczorne_dostarczenie]
      ,LEFT(CAST ([Standard_Delivery_OD] AS time),5) AS 'Standard_Delivery_OD'
      ,LEFT(CAST ([Standard_Delivery_DO] AS time),5) AS 'Standard_Delivery_DO'
      ,LEFT(CAST ([Pick-up_domestic_zgl] AS time),5)  AS 'Pick-up_domestic_zgl'
      ,LEFT(CAST ([Pick-up_eksport_sm_zgl] AS time),5) AS 'Pick-up_eksport_sm_zgl'
      ,[Samochod_z_winda_dostepny_w_standardzie]
      ,LEFT(CAST ([Diplomat_next_day] AS time),5) AS 'Diplomat_next_day'
      ,[Serwis_podmiejski]
      ,[Pick-up_domestic_czas]
      ,[Pick-up_eksport_sm_czas]
      ,[Serwis_miejski]
  FROM [MS].[dbo].[MS]
 