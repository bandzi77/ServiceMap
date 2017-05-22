USE [msdb]
GO

/****** Object:  Job [ServiceMap Import Data]    Script Date: 23.05.2017 00:16:46 ******/
BEGIN TRANSACTION
DECLARE @ReturnCode INT
SELECT @ReturnCode = 0
/****** Object:  JobCategory [[Uncategorized (Local)]]    Script Date: 23.05.2017 00:16:47 ******/
IF NOT EXISTS (SELECT name FROM msdb.dbo.syscategories WHERE name=N'[Uncategorized (Local)]' AND category_class=1)
BEGIN
EXEC @ReturnCode = msdb.dbo.sp_add_category @class=N'JOB', @type=N'LOCAL', @name=N'[Uncategorized (Local)]'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback

END

DECLARE @jobId BINARY(16)
EXEC @ReturnCode =  msdb.dbo.sp_add_job @job_name=N'ServiceMap Import Data', 
		@enabled=1, 
		@notify_level_eventlog=0, 
		@notify_level_email=0, 
		@notify_level_netsend=0, 
		@notify_level_page=0, 
		@delete_level=0, 
		@description=N'Brak opisu.', 
		@category_name=N'[Uncategorized (Local)]', 
		@owner_login_name=N'DESKTOP-KR3KFBT\mh_user', @job_id = @jobId OUTPUT
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [Download files from ftp]    Script Date: 23.05.2017 00:16:47 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'Download files from ftp', 
		@step_id=1, 
		@cmdexec_success_code=0, 
		@on_success_action=3, 
		@on_success_step_id=0, 
		@on_fail_action=2, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'CmdExec', 
		@command=N'D:\import\mrowa.cmd', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [ImportServicesTnt]    Script Date: 23.05.2017 00:16:47 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'ImportServicesTnt', 
		@step_id=2, 
		@cmdexec_success_code=0, 
		@on_success_action=3, 
		@on_success_step_id=0, 
		@on_fail_action=2, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'SET QUOTED_IDENTIFIER ON

-- Tworzy tymaczasow¹ tabelê

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
		[Serwis_miejski] [bit] NULL,
		[Serwis_podmiejski] [bit] NULL,
		[Pick-up_domestic_czas] [real] NULL,
		[Pick-up_eksport_sm_czas] [real] NULL,
	)

--	£aduje dane do tabeli tymczasowej
BEGIN TRY 
	BULK INSERT #importServicesTNT
	FROM ''D:\import\downloaded_files\mapa_serwisowa_na_www.txt'' WITH (FIRSTROW=2, FORMATFILE=''D:\ServiceTnt.fmt'');  
END TRY
BEGIN CATCH
	THROW
END CATCH

DECLARE 
 @isNotEmpty int=0;

 select @isNotEmpty= COUNT(*)
 from
 #importServicesTNT

-- £aduje dane do tabeli docelowej
if (ISNULL(@isNotEmpty,0)>1000)
BEGIN
	BEGIN TRANSACTION;  
		BEGIN TRY 
			-- Usuwa indexy na tabeli
			EXEC [dbo].[DropIndexOnServiceTnt]
			DELETE FROM [dbo].[ServiceTnt];
			INSERT INTO [dbo].[ServiceTnt]
				 ([Town]
				  ,[FromPostcode]
				  ,[ToPostcode]
				  ,[Depotcode]
				  ,[Sobota]
				  ,[EX9]
				  ,[EX10]
				  ,[EX12]
				  ,[Priority]
				  ,[WieczorneDostarczenie]
				  ,[StandardDeliveryOd]
				  ,[StandardDeliveryDo]
				  ,[PickUpDomesticZgl]
				  ,[DateTimePickUpEksportSmZgl]
				  ,[SamochodZwindaDostepnyWstandardzie]
				  ,[DiplomatNextDay]
				  ,[SerwisMiejski]
				  ,[SerwisPodmiejski]
				  ,[PickUpDomesticCzas]
				  ,[PickUpEksportSmCzas]
				 )
			SELECT [Town]
					,try_parse(replace([From_Postcode],''-'','''')  as int)
					,try_parse(replace([To_Postcode],''-'','''') as int)
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
					,[Serwis_miejski]
					,[Serwis_podmiejski]
					,[Pick-up_domestic_czas]
					,[Pick-up_eksport_sm_czas]
			FROM #importServicesTNT
			ORDER BY  [Town], try_parse(replace([From_Postcode],''-'','''')  as int),try_parse(replace([To_Postcode],''-'','''') as int)

			DROP TABLE IF exists #importServicesTNT
		
			-- Zak³ada od nowa indeksy na tabeli
			EXEC [dbo].[CreateIndexOnServiceTnt]

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
    PRINT ''Brak danych do importu'';
	THROW 51000, ''Brak danych do importu'', 1;  
END;', 
		@database_name=N'ServiceMap', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [ImportLocation]    Script Date: 23.05.2017 00:16:47 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'ImportLocation', 
		@step_id=3, 
		@cmdexec_success_code=0, 
		@on_success_action=1, 
		@on_success_step_id=0, 
		@on_fail_action=2, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'-- Tworzy tymaczasow¹ tabelê

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

--	£aduje dane do tabeli tymczasowej
BEGIN TRY 
	BULK INSERT #location
	FROM ''D:\import\downloaded_files\mapa_serwisowa_na_www_lokalizacja.txt'' WITH (FIRSTROW=2, FORMATFILE=''D:\Location.fmt'', CODEPAGE = 65001);  
END TRY
BEGIN CATCH
	THROW
END CATCH

DECLARE 
 @isNotEmpty int=0;

 select @isNotEmpty= COUNT(*)
 from #location

-- £aduje dane do tabeli docelowej
if (ISNULL(@isNotEmpty,0)>10)
BEGIN
	BEGIN TRANSACTION;  
		BEGIN TRY 
			-- Usuwa indexy na tabeli
			EXEC [dbo].[DropIndexOnLocation];

			DELETE FROM [dbo].[Location];
			INSERT INTO [dbo].[Location]
				 ( [DepotCode]
				  ,[AddressesTown]
				  ,[AddressesPostcode]
				  ,[AddressesStreet]
				  ,[InternationalPackageHoursInfo]
				  ,[DomesticPackageHoursInfo]
				  ,[SaturdayPackageHoursInfo]
				  ,[PassportPickupHoursInfo]
				  ,[WeekPackageHoursInfo]
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
		
			-- Zak³ada ponownie indeks na tabeli
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
    PRINT ''Brak danych do importu'';
	THROW 51000, ''Brak danych do importu'', 1;  
END;', 
		@database_name=N'ServiceMap', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_update_job @job_id = @jobId, @start_step_id = 1
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_add_jobschedule @job_id=@jobId, @name=N'Kopiuj', 
		@enabled=1, 
		@freq_type=4, 
		@freq_interval=1, 
		@freq_subday_type=1, 
		@freq_subday_interval=1, 
		@freq_relative_interval=1, 
		@freq_recurrence_factor=0, 
		@active_start_date=20170422, 
		@active_end_date=99991231, 
		@active_start_time=202000, 
		@active_end_time=235959, 
		@schedule_uid=N'2f4359a7-cb96-45a9-a1fb-787f8670cf82'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_add_jobserver @job_id = @jobId, @server_name = N'(local)'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
COMMIT TRANSACTION
GOTO EndSave
QuitWithRollback:
    IF (@@TRANCOUNT > 0) ROLLBACK TRANSACTION
EndSave:

GO


