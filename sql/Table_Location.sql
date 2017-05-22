USE [ServiceMap]
GO

/****** Object:  Table [dbo].[Location]    Script Date: 23.05.2017 00:18:36 ******/
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

ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Locations_DateInsert]  DEFAULT (getdate()) FOR [InsertDate]
GO

ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Locations_InsertTime]  DEFAULT (getdate()) FOR [InsertTime]
GO


