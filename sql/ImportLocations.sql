-- Tworzy tymaczasową tabelę

DROP TABLE IF exists #location
	CREATE TABLE #location (
		[DepotCode] [nvarchar](10) NOT NULL,
		[Addresses_Town] [nvarchar](max) NULL,
		[Addresses_Postcode] [nvarchar](6) NULL,
		[Addresses_Street] [nvarchar](max) NULL,
		[InternationalPackageHours_Info] [nvarchar](max) NULL,
		[DomesticPackageHours_Info] [nvarchar](max) NULL,
		[SaturdayPackageHours_Info] [nvarchar](max) NULL,
		[PassportPickupHours_Info] [nvarchar](max) NULL,
		[WeekPackageHours_Info] [nvarchar](max) NULL,
	)

--	Ładuje dane do tabeli tymczasowej
BEGIN TRY 
	BULK INSERT #location
	FROM 'D:\import\downloaded_files\mapa_serwisowa_na_www_lokalizacja.txt' WITH (FIRSTROW=2, FORMATFILE='D:\Location.fmt', CODEPAGE = 65001);  
END TRY
BEGIN CATCH
	THROW
END CATCH

DECLARE 
 @isNotEmpty int=0;

 select @isNotEmpty= COUNT(*)
 from #location

-- Ładuje dane do tabeli docelowej
if (ISNULL(@isNotEmpty,0)>10)
BEGIN
	BEGIN TRANSACTION;  
		BEGIN TRY 
			-- Usuwa indexy na tabeli
			EXEC [dbo].[DropIndexOnLocation];

			DELETE FROM [dbo].[Location];
			INSERT INTO [dbo].[Location]
				 ( [DepotCode]
				  ,[Addresses_Town]
				  ,[Addresses_Postcode]
				  ,[Addresses_Street]
				  ,[InternationalPackageHours_Info]
				  ,[DomesticPackageHours_Info]
				  ,[SaturdayPackageHours_Info]
				  ,[PassportPickupHours_Info]
				  ,[WeekPackageHours_Info]
				 )
			SELECT [DepotCode]
				  ,[Addresses_Town]
				  ,[Addresses_Postcode]
				  ,[Addresses_Street]
				  ,[InternationalPackageHours_Info]
				  ,[DomesticPackageHours_Info]
				  ,[SaturdayPackageHours_Info]
				  ,[PassportPickupHours_Info]
				  ,[WeekPackageHours_Info]
			FROM #location
			ORDER BY  [DepotCode],[Addresses_Town],[Addresses_Street],[Addresses_Postcode]

			DROP TABLE IF exists #location
		
			-- Zakłada ponownie indeks na tabeli
			EXEC [dbo].[CreateIndexOnLocation]

		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0  
			Begin
				ROLLBACK TRANSACTION; 
			End;

			THROW;
		END CATCH; 

	IF @@TRANCOUNT > 0  
	Begin
		COMMIT TRANSACTION; 
	End;

END;
ELSE 
BEGIN
    PRINT 'Brak danych do importu';
	THROW 51000, 'Brak danych do importu', 1;  
END;