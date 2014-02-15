
CREATE NONCLUSTERED INDEX [idx_BattingStatistics_TimeStamp] ON [dbo].[BattingStatistics]
(
	[TimeStamp] ASC
)

CREATE NONCLUSTERED INDEX [idx_PitchingStatistics_TimeStamp] ON [dbo].[PitchingStatistics]
(
	[TimeStamp] ASC
)