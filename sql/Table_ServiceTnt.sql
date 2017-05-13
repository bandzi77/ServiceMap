USE [FARMAX_SQLSRV]
GO

/****** Object:  Table [dbo].[ServiceTnt]    Script Date: 13.05.2017 13:58:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ServiceTnt](
	[Town] [nvarchar](60) NULL,
	[From_Postcode] [int] NULL,
	[To_Postcode] [int] NULL,
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
	[InsertDate] [date] NOT NULL,
	[InsertTime] [time](0) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[ServiceTnt] ADD  CONSTRAINT [DF_ServiceTnt_DateInsert]  DEFAULT (getdate()) FOR [InsertDate]
GO

ALTER TABLE [dbo].[ServiceTnt] ADD  CONSTRAINT [DF_ServiceTnt_InsertTime]  DEFAULT (getdate()) FOR [InsertTime]
GO


