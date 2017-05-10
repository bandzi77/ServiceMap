USE [MS]
GO

/****** Object:  Table [dbo].[Locations]    Script Date: 2017-03-02 10:58:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Locations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Addresses_Town] [nvarchar](max) NULL,
	[Addresses_Street] [nvarchar](max) NULL,
	[ExitCustomsOffice_OfficeNumber] [nvarchar](max) NULL,
	[AWKWInfo_IsSystemOrDiplomat] [nvarchar](max) NULL,
	[AWKWInfo_IsBHPCompliant] [bit] NOT NULL,
	[AWKWInfo_SupportingLocation] [nvarchar](max) NULL,
	[InternationalPackageHours_Info] [nvarchar](max) NULL,
	[DomesticPackageHours_Info] [nvarchar](max) NULL,
	[SaturdayPackageHours_Info] [nvarchar](max) NULL,
	[SaturdayOpsHours_Info] [nvarchar](max) NULL,
	[DepotCode] [nvarchar](max) NOT NULL,
	[WeekPackageHours_Info] [nvarchar](max) NULL,
	[CustomsOffice_OfficeNumber] [nvarchar](max) NULL,
	[ExitCustomsOffice_OfficeDesc] [nvarchar](max) NULL,
	[CustomsOffice_OfficeDesc] [nvarchar](max) NULL,
	[Addresses_Postcode] [nvarchar](6) NULL,
	[ContactInfo1_Phone] [nvarchar](max) NULL,
	[ContactInfo1_Extension] [nvarchar](max) NULL,
	[ContactInfo1_Description] [nvarchar](max) NULL,
	[ContactInfo2_Phone] [nvarchar](max) NULL,
	[ContactInfo2_Extension] [nvarchar](max) NULL,
	[ContactInfo2_Description] [nvarchar](max) NULL,
	[ContactInfo3_Phone] [nvarchar](max) NULL,
	[ContactInfo3_Extension] [nvarchar](max) NULL,
	[ContactInfo3_Description] [nvarchar](max) NULL,
	[AfterHoursContactInfo1_Phone] [nvarchar](max) NULL,
	[AfterHoursContactInfo1_Extension] [nvarchar](max) NULL,
	[AfterHoursContactInfo1_Description] [nvarchar](max) NULL,
	[AfterHoursContactInfo2_Phone] [nvarchar](max) NULL,
	[AfterHoursContactInfo2_Extension] [nvarchar](max) NULL,
	[AfterHoursContactInfo2_Description] [nvarchar](max) NULL,
	[AfterHoursContactInfo3_Phone] [nvarchar](max) NULL,
	[AfterHoursContactInfo3_Extension] [nvarchar](max) NULL,
	[AfterHoursContactInfo3_Description] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NOT NULL,
	[SamedayUndelCutoffTime_Info] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Locations] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


