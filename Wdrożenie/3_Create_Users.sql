/*
 Nale¿y ustawiæ odpowiednie has³a dla u¿ytkowników
*/

USE [master]
GO

/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [Sm_User]    Script Date: 29.05.2017 21:15:15 ******/
CREATE LOGIN [Sm_User] WITH PASSWORD=N'lVAoqV2SM91XaQo91af9Cyihd8SarS90DGGJKoXFAQs=', DEFAULT_DATABASE=[ServiceMap], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO


USE [ServiceMap]
GO
/****** Object:  User [Sm_User]    Script Date: 29.05.2017 20:24:05 ******/
CREATE USER [Sm_User] FOR LOGIN [Sm_User] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [Sm_User]
GO

use [ServiceMap]
GO
GRANT EXECUTE ON [dbo].[GetServicesTnt] TO [Sm_User]
GO

use [ServiceMap]
GO
GRANT EXECUTE ON [dbo].[udfClearStringForFTS] TO [Sm_User]
GO



USE [master]
GO

/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [SmId_User]    Script Date: 29.05.2017 21:15:45 ******/
CREATE LOGIN [SmId_User] WITH PASSWORD=N'uWPghe3i5r8oqvJZe9FH14xPVwFefV7vh54m3aJhgx4=', DEFAULT_DATABASE=[SM_IdentityUser], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

Use [SM_IdentityUser]

/****** Object:  User [SmId_User]    Script Date: 29.05.2017 21:12:20 ******/
CREATE USER [SmId_User] FOR LOGIN [SmId_User] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [SmId_User]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [SmId_User]
GO
