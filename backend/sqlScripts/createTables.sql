

CREATE TABLE [dbo].[BattingStatistics](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeamPlayerId] [int] NOT NULL,
	[TimeStamp] [datetime] NOT NULL,
	[Rk] [smallint] NULL,
	[Gcar] [smallint] NULL,
	[Gtm] [float] NULL,
	[Column 7] [varchar](50) NULL,
	[Opp] [varchar](50) NULL,
	[Rslt] [varchar](50) NULL,
	[score] [varchar](50) NULL,
	[Inngs] [varchar](50) NULL,
	[PA] [smallint] NULL,
	[AB] [smallint] NULL,
	[R] [smallint] NULL,
	[H] [smallint] NULL,
	[2B] [smallint] NULL,
	[3B] [smallint] NULL,
	[HR] [smallint] NULL,
	[RBI] [smallint] NULL,
	[BB] [smallint] NULL,
	[IBB] [smallint] NULL,
	[SO] [smallint] NULL,
	[HBP] [smallint] NULL,
	[SH] [smallint] NULL,
	[SF] [float] NULL,
	[ROE] [smallint] NULL,
	[GDP] [smallint] NULL,
	[SB] [smallint] NULL,
	[CS] [smallint] NULL,
	[BA] [float] NULL,
	[OBP] [float] NULL,
	[SLG] [float] NULL,
	[OPS] [float] NULL,
	[BOP] [smallint] NULL,
	[aLI] [float] NULL,
	[WPA] [float] NULL,
	[RE24] [float] NULL,
 CONSTRAINT [PK_Statistics] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)

GO

CREATE TABLE [dbo].[PitchingStatistics](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeamPlayerId] [int] NOT NULL,
	[TimeStamp] [datetime] NOT NULL,
	[Rk] [smallint] NULL,
	[Gcar] [smallint] NULL,
	[Gtm] [float] NULL,
	[Column 7] [varchar](50) NULL,
	[Opp] [varchar](50) NULL,
	[Rslt] [varchar](50) NULL,
	[score] [varchar](50) NULL,
	[Inngs] [varchar](50) NULL,
	[Dec] [varchar](50) NULL,
	[DR] [smallint] NULL,
	[IP] [float] NULL,
	[H] [smallint] NULL,
	[R] [smallint] NULL,
	[ER] [smallint] NULL,
	[BB] [smallint] NULL,
	[SO] [smallint] NULL,
	[HR] [smallint] NULL,
	[HBP] [smallint] NULL,
	[ERA] [float] NULL,
	[BF] [smallint] NULL,
	[Pit] [smallint] NULL,
	[Str] [smallint] NULL,
	[StL] [smallint] NULL,
	[StS] [smallint] NULL,
	[GB] [smallint] NULL,
	[FB] [smallint] NULL,
	[LD] [smallint] NULL,
	[PU] [smallint] NULL,
	[Unk] [smallint] NULL,
	[GSc] [smallint] NULL,
	[IR] [smallint] NULL,
	[IS] [smallint] NULL,
	[SB] [smallint] NULL,
	[CS] [smallint] NULL,
	[PO] [smallint] NULL,
	[AB] [smallint] NULL,
	[2B] [smallint] NULL,
	[3B] [smallint] NULL,
	[IBB] [smallint] NULL,
	[GDP] [smallint] NULL,
	[SF] [float] NULL,
	[ROE] [smallint] NULL,
	[aLI] [float] NULL,
	[WPA] [float] NULL,
	[RE24] [float] NULL,
	[Entered] [varchar](50) NULL,
 CONSTRAINT [PK_PitchingStatistics] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)

GO

CREATE TABLE [dbo].[Players](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Players] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)

GO


CREATE TABLE [dbo].[TeamPlayers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeamId] [int] NOT NULL,
	[PlayerId] [int] NOT NULL,
 CONSTRAINT [PK_TeamPlayers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)

GO


CREATE TABLE [dbo].[Teams](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Teams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)

GO

ALTER TABLE [dbo].[BattingStatistics]  WITH CHECK ADD  CONSTRAINT [FK_BattingStatistics_TeamPlayerId_TeamPlayers_Id] FOREIGN KEY([TeamPlayerId])
REFERENCES [dbo].[TeamPlayers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BattingStatistics] CHECK CONSTRAINT [FK_BattingStatistics_TeamPlayerId_TeamPlayers_Id]
GO
ALTER TABLE [dbo].[PitchingStatistics]  WITH CHECK ADD  CONSTRAINT [FK_PitchingStatistics_TeamPlayerId_TeamPlayers_Id] FOREIGN KEY([TeamPlayerId])
REFERENCES [dbo].[TeamPlayers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PitchingStatistics] CHECK CONSTRAINT [FK_PitchingStatistics_TeamPlayerId_TeamPlayers_Id]
GO
ALTER TABLE [dbo].[TeamPlayers]  WITH CHECK ADD  CONSTRAINT [FK_TeamPlayers_PlayerId_Players_Id] FOREIGN KEY([PlayerId])
REFERENCES [dbo].[Players] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TeamPlayers] CHECK CONSTRAINT [FK_TeamPlayers_PlayerId_Players_Id]
GO
ALTER TABLE [dbo].[TeamPlayers]  WITH CHECK ADD  CONSTRAINT [FK_TeamPlayers_TeamId_Teams_Id] FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TeamPlayers] CHECK CONSTRAINT [FK_TeamPlayers_TeamId_Teams_Id]
GO
