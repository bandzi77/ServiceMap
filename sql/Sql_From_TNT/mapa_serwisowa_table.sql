USE [MS]
GO

/****** Object:  Table [dbo].[MS]    Script Date: 2017-03-02 09:54:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Town] [nvarchar](60) NULL,
	[From_Postcode] [nvarchar](6) NULL,
	[To_Postcode] [nvarchar](6) NULL,
	[Depot_code-1a] [nvarchar](max) NULL,
	[Service_area_code-1] [nvarchar](max) NULL,
	[Satellite_area_code-2a] [nvarchar](max) NULL,
	[Service_area_code-2] [nvarchar](max) NULL,
	[Priority] [datetime] NULL,
	[Wieczorne_dostarczenie] [bit] NULL,
	[Standard_Delivery_OD] [datetime] NULL,
	[Standard_Delivery_DO] [datetime] NULL,
	[Pick-up_domestic_zgl] [datetime] NULL,
	[Pick-up_eksport_sm_zgl] [datetime] NULL,
	[Samochod_z_winda_dostepny_w_standardzie] [bit] NULL,
	[Diplomat_next_day] [datetime] NULL,
	[Serwis_podmiejski] [bit] NULL,
	[Pick-up_domestic_czas] [real] NULL,
	[Pick-up_eksport_sm_czas] [real] NULL,
	[Serwis_miejski] [bit] NULL,
 CONSTRAINT [PK_dbo.MS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


