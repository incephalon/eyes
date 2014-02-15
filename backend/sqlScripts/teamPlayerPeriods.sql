USE [baseball]
GO
--CREATE TABLE [dbo].[TeamPlayerPeriods](
--	[Id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
--	[TeamPlayerId] [int] NOT NULL,
--	[FromYear] [smallint] NOT NULL,
--	[ToYear] [smallint] NULL
--	)

--GO

--ALTER TABLE [dbo].[TeamPlayerPeriods] ADD  CONSTRAINT [FK_TeamPlayerPeriods_TeamPlayerId_TeamPlayers_Id] FOREIGN KEY([TeamPlayerId])
--REFERENCES [dbo].[TeamPlayers] ([Id])
--ON DELETE CASCADE
--GO

--insert into TeamPlayerPeriods(TeamPlayerId, FromYear, ToYear)

--select teamPlayerId, year(min(start)), year(max([end])) from
--  (select teamPlayerId ,min(timeStamp) start, max(timeStamp) [end] from battingstatistics
--  group by teamplayerId 
--  union all
--  select teamPlayerId ,min(timeStamp) start, max(timeStamp) [end] from pitchingstatistics
--  group by teamplayerId) allStat 
--group by teamplayerId
--order by teamPlayerId

--select * from teamPlayerPeriods
