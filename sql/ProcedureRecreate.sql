USE [FARMAX_SQLSRV]
GO

/****** Object:  StoredProcedure [dbo].[RecreateIndexOnServiceTnt]    Script Date: 12.05.2017 23:35:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Hyla Mariusz
-- Create date: 2017-05-12
-- Description:	Importuje dane o serwisach Tnt w lokalizacjach
-- =============================================
CREATE PROCEDURE [dbo].[RecreateIndexOnServiceTnt] 
	
AS
BEGIN
	SET NOCOUNT ON;

	DROP INDEX [Town_FromToPostcode] ON [dbo].[ServiceTnt] WITH ( ONLINE = OFF )
	DROP INDEX [Postcode] ON [dbo].[ServiceTnt]
	DROP INDEX [Town] ON [dbo].[ServiceTnt]

	CREATE CLUSTERED INDEX [Town_FromToPostcode] ON [dbo].[ServiceTnt]
	(
		[Town] ASC,
		[From_Postcode] ASC,
		[To_Postcode] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

	CREATE NONCLUSTERED INDEX [Town] ON [dbo].[ServiceTnt]
	(
		[Town] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

	CREATE NONCLUSTERED INDEX [Postcode] ON [dbo].[ServiceTnt]
	(
		[From_Postcode] ASC,
		[To_Postcode] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END

GO


