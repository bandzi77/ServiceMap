
-- To allow advanced options to be changed.
EXEC sp_configure 'show advanced options', 1
GO
-- To update the currently configured value for advanced options.
RECONFIGURE
GO
-- To enable the feature.
EXEC sp_configure 'xp_cmdshell', 1
GO
-- To update the currently configured value for this feature.
RECONFIGURE
GO
/*
Uwaga
Po wygenerowaniu nale�y usn�� dwie ostatnie kolumny z dat� i czasem insertu oraz zmieni� ilo�� kolumnd - 2 wiersz
Dodatkow w pliku Location nale�y zamieni� Polish_CI_AS na "" - bo si� srogo zepsuje import
*/
EXECUTE master.dbo.xp_cmdshell 'bcp [FARMAX_SQLSRV].[dbo].[ServiceTnt] format nul -c -f D:\ServiceTnt.fmt -S DESKTOP-KR3KFBT\MS2016DEV -T'
EXECUTE master.dbo.xp_cmdshell 'bcp [FARMAX_SQLSRV].[dbo].[Location] format nul -c -f D:\Location.fmt -S DESKTOP-KR3KFBT\MS2016DEV -T'