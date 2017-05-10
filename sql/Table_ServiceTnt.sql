USE [FARMAX_SQLSRV]
GO

/****** Object:  Table [dbo].[TEST]    Script Date: 10.05.2017 23:04:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TEST](
	[Town] [nvarchar](60) NULL,
	[FromPostcode] [nvarchar](6) NULL,
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
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


