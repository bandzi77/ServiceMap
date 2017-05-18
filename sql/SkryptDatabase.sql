USE [master]
GO
/****** Object:  Database [ServiceMap]    Script Date: 18.05.2017 22:30:24 ******/
CREATE DATABASE [ServiceMap]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ServiceMap', FILENAME = N'C:\Projekty\ServiceMap\DB\ServiceMap.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[Location]    Script Date: 18.05.2017 22:30:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[DepotCode] [nvarchar](10) NOT NULL,
	[Addresses_Town] [nvarchar](max) NULL,
	[Addresses_Postcode] [nvarchar](6) NULL,
	[Addresses_Street] [nvarchar](max) NULL,
	[InternationalPackageHours_Info] [nvarchar](max) NULL,
	[DomesticPackageHours_Info] [nvarchar](max) NULL,
	[SaturdayPackageHours_Info] [nvarchar](max) NULL,
	[PassportPickupHours_Info] [nvarchar](max) NULL,
	[WeekPackageHours_Info] [nvarchar](max) NULL,
	[InsertDate] [date] NOT NULL,
	[InsertTime] [time](0) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [DepotCodeIdx]    Script Date: 18.05.2017 22:30:24 ******/
CREATE CLUSTERED INDEX [DepotCodeIdx] ON [dbo].[Location]
(
	[DepotCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceTnt]    Script Date: 18.05.2017 22:30:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceTnt](
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
	[InsertTime] [time](0) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [Town_FromToPostcode]    Script Date: 18.05.2017 22:30:24 ******/
CREATE CLUSTERED INDEX [Town_FromToPostcode] ON [dbo].[ServiceTnt]
(
	[Town] ASC,
	[FromPostcode] ASC,
	[ToPostcode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Postcode]    Script Date: 18.05.2017 22:30:24 ******/
CREATE NONCLUSTERED INDEX [Postcode] ON [dbo].[ServiceTnt]
(
	[FromPostcode] ASC,
	[ToPostcode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [Town]    Script Date: 18.05.2017 22:30:24 ******/
CREATE NONCLUSTERED INDEX [Town] ON [dbo].[ServiceTnt]
(
	[Town] ASC
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
/****** Object:  StoredProcedure [dbo].[CreateIndexOnLocation]    Script Date: 18.05.2017 22:30:24 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateIndexOnServiceTnt]    Script Date: 18.05.2017 22:30:24 ******/
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
	CREATE CLUSTERED INDEX [Town_FromToPostcode] ON [dbo].[ServiceTnt]
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
/****** Object:  StoredProcedure [dbo].[DropIndexOnLocation]    Script Date: 18.05.2017 22:30:24 ******/
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
/****** Object:  StoredProcedure [dbo].[DropIndexOnServiceTnt]    Script Date: 18.05.2017 22:30:24 ******/
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
USE [master]
GO
ALTER DATABASE [ServiceMap] SET  READ_WRITE 
GO
