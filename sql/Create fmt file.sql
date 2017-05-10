
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

EXECUTE master.dbo.xp_cmdshell 'bcp [FARMAX_SQLSRV].[dbo].[TEST] format nul -c -f D:\TEST.fmt -S DESKTOP-KR3KFBT\MS2016DEV -T'