-- Tworzy tymaczasową tabelę

DROP TABLE IF exists #importServicesTNT
	CREATE TABLE #importServicesTNT (
		[Town] [nvarchar](60) NULL,
		[From_Postcode] [nvarchar](6) NULL,
		[To_Postcode] [nvarchar](6) NULL,
		[Depot_code-1a] [nvarchar](max) NULL,
		[Sobota] [bit] NOT NULL,
		[EX9] [bit] NOT NULL,
		[EX10] [bit] NOT NULL,
		[EX12] [bit] NOT NULL,
		[Priority] [time](0) NULL,
		[Wieczorne_dostarczenie] [bit] NULL,
		[Standard_Delivery_OD] [time](0) NULL,
		[Standard_Delivery_DO] [time](0) NULL,
		[Pick-up_domestic_zgl] [time](0) NULL,
		[Pick-up_eksport_sm_zgl] [time](0) NULL,
		[Samochod_z_winda_dostepny_w_standardzie] [bit] NULL,
		[Diplomat_next_day] [time](0) NULL,
		[Serwis_podmiejski] [bit] NULL,
		[Pick-up_domestic_czas] [real] NULL,
		[Pick-up_eksport_sm_czas] [real] NULL,
		[Serwis_miejski] [bit] NULL
	)

--	Ładuje dane do tabeli tymczasowej
BEGIN TRY 
	BULK INSERT #importServicesTNT
	FROM 'D:\SM.txt' WITH (FIRSTROW=2, FORMATFILE='D:\TEST.fmt');  
END TRY
BEGIN CATCH
	THROW
END CATCH

DECLARE 
 @isNotEmpty int=0;

 select @isNotEmpty= COUNT(*)
 from
 #importServicesTNT

-- Ładuje dane do tabeli docelowej
if (ISNULL(@isNotEmpty,0)>1000)
BEGIN
	BEGIN TRANSACTION;  
		BEGIN TRY 
			DELETE FROM [dbo].[ServiceTnt];
			INSERT INTO [dbo].[ServiceTnt]
				 ([Town]
				  ,[From_Postcode]
				  ,[To_Postcode]
				  ,[Depot_code-1a]
				  ,[Sobota]
				  ,[EX9]
				  ,[EX10]
				  ,[EX12]
				  ,[Priority]
				  ,[Wieczorne_dostarczenie]
				  ,[Standard_Delivery_OD]
				  ,[Standard_Delivery_DO]
				  ,[Pick-up_domestic_zgl]
				  ,[Pick-up_eksport_sm_zgl]
				  ,[Samochod_z_winda_dostepny_w_standardzie]
				  ,[Diplomat_next_day]
				  ,[Serwis_podmiejski]
				  ,[Pick-up_domestic_czas]
				  ,[Pick-up_eksport_sm_czas]
				  ,[Serwis_miejski])
			SELECT [Town]
					,try_parse(replace([From_Postcode],'-','')  as int)
					,try_parse(replace([To_Postcode],'-','') as int)
					,[Depot_code-1a]
					,[Sobota]
					,[EX9]
					,[EX10]
					,[EX12]
					,[Priority]
					,[Wieczorne_dostarczenie]
					,[Standard_Delivery_OD]
					,[Standard_Delivery_DO]
					,[Pick-up_domestic_zgl]
					,[Pick-up_eksport_sm_zgl]
					,[Samochod_z_winda_dostepny_w_standardzie]
					,[Diplomat_next_day]
					,[Serwis_podmiejski]
					,[Pick-up_domestic_czas]
					,[Pick-up_eksport_sm_czas]
					,[Serwis_miejski]
			FROM #importServicesTNT
			ORDER BY  [Town], try_parse(replace([From_Postcode],'-','')  as int),try_parse(replace([To_Postcode],'-','') as int)

			DROP TABLE IF exists #importServicesTNT
		
			-- Zakłada od nowa indeksy na tabeli
			EXEC [dbo].[RecreateIndexOnServiceTnt]
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