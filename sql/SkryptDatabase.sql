USE [master]
GO
/****** Object:  Database [ServiceMap]    Script Date: 23.05.2017 00:18:10 ******/
CREATE DATABASE [ServiceMap]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ServiceMap', FILENAME = N'C:\Projekty\ServiceMap\DB\ServiceMap.mdf' , SIZE = 86208KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ServiceMap_log', FILENAME = N'C:\Projekty\ServiceMap\DB\ServiceMap_log.ldf' , SIZE = 204800KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ServiceMap] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ServiceMap].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ServiceMap] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ServiceMap] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ServiceMap] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ServiceMap] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ServiceMap] SET ARITHABORT OFF 
GO
ALTER DATABASE [ServiceMap] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ServiceMap] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ServiceMap] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ServiceMap] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ServiceMap] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ServiceMap] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ServiceMap] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ServiceMap] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ServiceMap] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ServiceMap] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ServiceMap] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ServiceMap] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ServiceMap] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ServiceMap] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ServiceMap] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ServiceMap] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ServiceMap] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ServiceMap] SET RECOVERY FULL 
GO
ALTER DATABASE [ServiceMap] SET  MULTI_USER 
GO
ALTER DATABASE [ServiceMap] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ServiceMap] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ServiceMap] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ServiceMap] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ServiceMap] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ServiceMap', N'ON'
GO
ALTER DATABASE [ServiceMap] SET QUERY_STORE = OFF
GO
USE [ServiceMap]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [ServiceMap]
GO
/****** Object:  FullTextCatalog [FG_Main]    Script Date: 23.05.2017 00:18:10 ******/
CREATE FULLTEXT CATALOG [FG_Main]WITH ACCENT_SENSITIVITY = ON
AS DEFAULT

GO
/****** Object:  UserDefinedFunction [dbo].[udfClearStringForFTS]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	CREATE FUNCTION [dbo].[udfClearStringForFTS](@str nvarchar(1024))
	RETURNS nvarchar(1024) AS
	BEGIN 
		WHILE CHARINDEX('  ', @str) > 0 
			SET @str = REPLACE(@str, '  ', ' ')

		RETURN rtrim(ltrim(@str));
	END

GO
/****** Object:  Table [dbo].[Location]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[DepotCode] [nvarchar](10) NOT NULL,
	[AddressesTown] [nvarchar](max) NULL,
	[AddressesPostcode] [nvarchar](6) NULL,
	[AddressesStreet] [nvarchar](max) NULL,
	[InternationalPackageHoursInfo] [nvarchar](max) NULL,
	[DomesticPackageHoursInfo] [nvarchar](max) NULL,
	[SaturdayPackageHoursInfo] [nvarchar](max) NULL,
	[PassportPickupHoursInfo] [nvarchar](max) NULL,
	[WeekPackageHoursInfo] [nvarchar](max) NULL,
	[InsertDate] [date] NOT NULL,
	[InsertTime] [time](0) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [DepotCodeIdx]    Script Date: 23.05.2017 00:18:10 ******/
CREATE CLUSTERED INDEX [DepotCodeIdx] ON [dbo].[Location]
(
	[DepotCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceTnt]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceTnt](
	[ServiceTntId] [int] IDENTITY(1,1) NOT NULL,
	[Town] [nvarchar](60) NULL,
	[FromPostcode] [int] NULL,
	[ToPostcode] [int] NULL,
	[DepotCode] [nvarchar](max) NULL,
	[Sobota] [bit] NOT NULL,
	[EX9] [bit] NOT NULL,
	[EX10] [bit] NOT NULL,
	[EX12] [bit] NOT NULL,
	[Priority] [time](0) NULL,
	[WieczorneDostarczenie] [bit] NULL,
	[StandardDeliveryOd] [time](0) NULL,
	[StandardDeliveryDo] [time](0) NULL,
	[PickUpDomesticZgl] [time](0) NULL,
	[DateTimePickUpEksportSmZgl] [time](0) NULL,
	[SamochodZwindaDostepnyWstandardzie] [bit] NULL,
	[DiplomatNextDay] [time](0) NULL,
	[SerwisMiejski] [bit] NULL,
	[SerwisPodmiejski] [bit] NULL,
	[PickUpDomesticCzas] [real] NULL,
	[PickUpEksportSmCzas] [real] NULL,
	[InsertDate] [date] NOT NULL,
	[InsertTime] [time](0) NOT NULL,
	[FromPostcodeStr]  AS ((left(right('00000'+TRY_CAST([FromPostcode] AS [nvarchar](5)),(5)),(2))+'-')+right('00000'+TRY_CAST([FromPostcode] AS [nvarchar](5)),(3))) PERSISTED,
	[ToPostCodeStr]  AS ((left(right('00000'+TRY_CAST([ToPostcode] AS [nvarchar](5)),(5)),(2))+'-')+right('00000'+TRY_CAST([ToPostcode] AS [nvarchar](5)),(3))) PERSISTED
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Index [ServiceTntId_Idx]    Script Date: 23.05.2017 00:18:10 ******/
CREATE UNIQUE CLUSTERED INDEX [ServiceTntId_Idx] ON [dbo].[ServiceTnt]
(
	[ServiceTntId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Postcode]    Script Date: 23.05.2017 00:18:10 ******/
CREATE NONCLUSTERED INDEX [Postcode] ON [dbo].[ServiceTnt]
(
	[FromPostcode] ASC,
	[ToPostcode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [Town]    Script Date: 23.05.2017 00:18:10 ******/
CREATE NONCLUSTERED INDEX [Town] ON [dbo].[ServiceTnt]
(
	[Town] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [Town_FromToPostcode]    Script Date: 23.05.2017 00:18:10 ******/
CREATE NONCLUSTERED INDEX [Town_FromToPostcode] ON [dbo].[ServiceTnt]
(
	[Town] ASC,
	[FromPostcode] ASC,
	[ToPostcode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Locations_DateInsert]  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Locations_InsertTime]  DEFAULT (getdate()) FOR [InsertTime]
GO
ALTER TABLE [dbo].[ServiceTnt] ADD  CONSTRAINT [DF_ServiceTnt_DateInsert]  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [dbo].[ServiceTnt] ADD  CONSTRAINT [DF_ServiceTnt_InsertTime]  DEFAULT (getdate()) FOR [InsertTime]
GO
/****** Object:  StoredProcedure [dbo].[CreateIndexOnLocation]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Hyla Mariusz
-- Create date: 2017-05-12
-- Description:	Zakłada indesy na tabeli [dbo].[Location]
-- =============================================
create PROCEDURE [dbo].[CreateIndexOnLocation] 
	
AS
BEGIN
	SET NOCOUNT ON;
	CREATE CLUSTERED INDEX [DepotCodeIdx] ON [dbo].[Location]
		(
			[DepotCode] ASC
		)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

END


GO
/****** Object:  StoredProcedure [dbo].[CreateIndexOnServiceTnt]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Hyla Mariusz
-- Create date: 2017-05-12
-- Description:	Importuje dane o serwisach Tnt w lokalizacjach
-- =============================================
CREATE PROCEDURE [dbo].[CreateIndexOnServiceTnt] 
	
AS
BEGIN
	SET NOCOUNT ON;

    ALTER INDEX [ServiceTntId_Idx] ON [dbo].[ServiceTnt] REBUILD PARTITION = ALL WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)

	CREATE NONCLUSTERED INDEX [Town_FromToPostcode] ON [dbo].[ServiceTnt]
	(
		[Town] ASC,
		[FromPostcode] ASC,
		[ToPostcode] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

	CREATE NONCLUSTERED INDEX [Town] ON [dbo].[ServiceTnt]
	(
		[Town] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

	CREATE NONCLUSTERED INDEX [Postcode] ON [dbo].[ServiceTnt]
	(
		[FromPostcode] ASC,
		[ToPostcode] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END


GO
/****** Object:  StoredProcedure [dbo].[DropIndexOnLocation]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Hyla Mariusz
-- Create date: 2017-05-12
-- Description:	Usuwa index na tabeli Location
-- =============================================
Create PROCEDURE [dbo].[DropIndexOnLocation] 
	
AS
BEGIN
	SET NOCOUNT ON;
	DROP INDEX IF exists [DepotCodeIdx] ON [dbo].[Location] WITH ( ONLINE = OFF )
END


GO
/****** Object:  StoredProcedure [dbo].[DropIndexOnServiceTnt]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Hyla Mariusz
-- Create date: 2017-05-12
-- Description:	Importuje dane o serwisach Tnt w lokalizacjach
-- =============================================
CREATE PROCEDURE [dbo].[DropIndexOnServiceTnt] 
	
AS
BEGIN
	SET NOCOUNT ON;

	DROP INDEX IF exists [Town_FromToPostcode] ON [dbo].[ServiceTnt] WITH ( ONLINE = OFF )
	DROP INDEX IF exists  [Postcode] ON [dbo].[ServiceTnt]
	DROP INDEX IF exists  [Town] ON [dbo].[ServiceTnt]
END


GO
/****** Object:  StoredProcedure [dbo].[GetServicesTnt]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetServicesTnt]
       @postCode nvarchar(6) = null,                                           
       @town NVARCHAR(50) = NULL,               
       @order_by    SYSNAME      = NULL,                           -- nazwa pola do sortowania
       @start       INT    = 0,                                    -- ile poczatkowych wierszy pominąć
       @limit       INT    = 25                                    -- liczba wierszy wyswietlanych na stronie
AS
BEGIN
       SET NOCOUNT ON;

       DECLARE
	   
		   @full_name_fts NVARCHAR(1024),
		   @sql nvarchar(max),
		   @sql_where nvarchar(max) = '',
		   @parmDefinition nvarchar(max) = '';  
		   
       SELECT @full_name_fts = '"' + COALESCE(REPLACE(dbo.udfClearStringForFTS(@town), SPACE(1), '*" AND "'), '''') + '*"';
	  
	   -- Budaje warunek dla miasta
	   if (@town is not null)
	   Begin 
		set	@sql_where = 'INNER JOIN CONTAINSTABLE([dbo].[ServiceTnt] , town, @full_name_fts) fts ON s.ServiceTntId  = fts.[KEY]';
	   End;
	  
	  -- Buduje warunek dla kodu pocztowego
	  set @postCode= rtrim(ltrim(isnull(@postCode,'')));
	  if (len(@postCode)>0)
	  Begin
		 if (len(@postCode)=6)
			  Begin
				 set @sql_where =@sql_where + ' where TRY_CONVERT(int,replace(@postCode,''-'','''')) between s.FromPostcode and s.ToPostcode '
			  End;
		 else 
		 Begin 
			set @sql_where =@sql_where + ' where s.FromPostcodeStr like @postCode+''%''';
		 End;
	  End;

	 set @sql =
	   'WITH _data AS (
            SELECT 
			   [ServiceTntId]
			  ,[Town]
			  ,[FromPostcodeStr] as FromPostcode
			  ,[ToPostcodeStr] as ToPostcode
			  ,[DepotCode]
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
		  FROM [dbo].[ServiceTnt] s '
			 +@sql_where+
		'	 
		),
		  _paging AS (
          SELECT *, ROW_NUMBER() OVER(ORDER BY [town], [FromPostcode] ) AS RowNumber, COUNT([ServiceTntId]) OVER() AS TotalCount
          FROM _data
       )
	   SELECT 
		   [Town]
		  ,[FromPostcode]
		  ,[ToPostcode]
		  ,[DepotCode]
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
		  ,RowNumber
		  ,TotalCount
       FROM _paging
       WHERE RowNumber BETWEEN '+Try_Convert(nvarchar(100),ISNULL(@start, 0)+1)+ ' AND ISNULL('+Try_Convert(nvarchar(100),@start + @limit)+', TotalCount)
       ORDER BY RowNumber;'
	  --  select @sql;

	  -- Wyszukuje w zależności od wypełnionych paramatrów
	  if (len(@postCode)>0 And (@town is not null))
	   Begin 
	   set @parmDefinition = @parmDefinition+ ' @full_name_fts NVARCHAR(1024), @postCode nvarchar(6)'
		   exec sp_executesql 
		   @sql,
		   @parmDefinition,
		   @full_name_fts=@full_name_fts,
		   @postCode=@postCode
	   End

	   if (len(@postCode)>0 And (@town is null))
	   Begin 
	   	   set @parmDefinition = @parmDefinition+ '@postCode nvarchar(6)'
		   exec sp_executesql 
		   @sql,
		   @parmDefinition,
		   @postCode=@postCode
	   End

	   if (len(@postCode)=0 And (@town is not null))
	   Begin 
	       set @parmDefinition = @parmDefinition+ '@full_name_fts NVARCHAR(1024)'
		   exec sp_executesql 
		   @sql,
		   @parmDefinition,
		   @full_name_fts=@full_name_fts
	   End

	   if (len(@postCode)=0 And (@town is null))
	   Begin 
		   exec sp_executesql 
		   @sql
	   End

End;
GO
/****** Object:  StoredProcedure [dbo].[GetServicesTnt_old]    Script Date: 23.05.2017 00:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetServicesTnt_old]
       @postCode INT = null,                                           -- identyfikator placówki CBM
       @town NVARCHAR(50) = NULL,               -- fraza do wyszukania w imieniu lub nazwisku lekarza
       @order_by    SYSNAME      = NULL,                           -- nazwa pola do sortowania
       @start       INT    = 0,                                    -- ile poczatkowych wierszy pominąć
       @limit       INT    = 25                                    -- liczba wierszy wyswietlanych na stronie
AS
BEGIN

       SET NOCOUNT ON;

       DECLARE @full_name_fts NVARCHAR(1024);
       SELECT @full_name_fts = '"' + COALESCE(REPLACE(dbo.udfClearStringForFTS(@town), SPACE(1), '*" AND "'), '') + '*"';

	   WITH _data AS (
            SELECT 
			   [ServiceTntId]
			  ,[Town]
			  ,left(right('00000'+TRY_CONVERT(varchar(5),[FromPostcode]),5),2)+'-'+right('00000'+TRY_CONVERT(varchar(5),[FromPostcode]),3) as FromPostcode
			  ,left(right('00000'+TRY_CONVERT(varchar(5),[ToPostcode]),5),2)+'-'+right('00000'+TRY_CONVERT(varchar(5),[ToPostcode]),3) as ToPostcode
			  ,[DepotCode]
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
		  FROM [dbo].[ServiceTnt] s
		      LEFT JOIN CONTAINSTABLE([dbo].[ServiceTnt] , town, @full_name_fts) fts
              ON s.ServiceTntId  = fts.[KEY]
		  WHERE
				(fts.[KEY] IS NOT NULL OR @town IS NULL)  and 
				isnull(@postCode,FromPostcode)  between FromPostcode and ToPostcode
			  ),
			  _paging AS (
          SELECT *, ROW_NUMBER() OVER(ORDER BY [town], [FromPostcode] ) AS RowNumber, COUNT([ServiceTntId]) OVER() AS TotalCount
          FROM _data
       )
	   SELECT 
		   [Town]
		  ,[FromPostcode]
		  ,[ToPostcode]
		  ,[DepotCode]
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
		  ,RowNumber
		  ,TotalCount
       FROM _paging
       WHERE RowNumber BETWEEN ISNULL(@start, 0) + 1 AND ISNULL(@start + @limit, TotalCount)
       ORDER BY RowNumber;
End;
GO
USE [master]
GO
ALTER DATABASE [ServiceMap] SET  READ_WRITE 
GO
