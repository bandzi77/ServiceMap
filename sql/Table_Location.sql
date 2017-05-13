USE [FARMAX_SQLSRV]
GO

/****** Object:  Table [dbo].[Location]    Script Date: 13.05.2017 13:58:22 ******/
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

ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Locations_DateInsert]  DEFAULT (getdate()) FOR [InsertDate]
GO

ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Locations_InsertTime]  DEFAULT (getdate()) FOR [InsertTime]
GO


