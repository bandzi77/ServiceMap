
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
Po wygenerowaniu nale¿y usn¹æ dwie ostatnie kolumny z dat¹ i czasem insertu oraz zmieniæ iloœæ kolumnd - 2 wiersz
Dodatkow w pliku Location nale¿y zamieniæ Polish_CI_AS na "" - bo siê srogo zepsuje import
*/
EXECUTE master.dbo.xp_cmdshell 'bcp [FARMAX_SQLSRV].[dbo].[ServiceTnt] format nul -c -f D:\ServiceTnt.fmt -S DESKTOP-KR3KFBT\MS2016DEV -T'
EXECUTE master.dbo.xp_cmdshell 'bcp [FARMAX_SQLSRV].[dbo].[Location] format nul -c -f D:\Location.fmt -S DESKTOP-KR3KFBT\MS2016DEV -T'