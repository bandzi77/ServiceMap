USE [ServiceMap]
GO

/****** Object:  Table [dbo].[ServiceTnt]    Script Date: 23.05.2017 00:18:48 ******/
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

ALTER TABLE [dbo].[ServiceTnt] ADD  CONSTRAINT [DF_ServiceTnt_DateInsert]  DEFAULT (getdate()) FOR [InsertDate]
GO

ALTER TABLE [dbo].[ServiceTnt] ADD  CONSTRAINT [DF_ServiceTnt_InsertTime]  DEFAULT (getdate()) FOR [InsertTime]
GO


