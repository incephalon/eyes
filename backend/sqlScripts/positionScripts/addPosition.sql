select top 100 p.name, t.name as tm, s.timestamp, s.rk, s.gcar from [dbo].[BattingStatistics] as s
join teamplayers as tp on tp.id = s.teamplayerid
join players as p on tp.playerid = p.id
join teams as t on tp.teamid = t.id

where p.name = 'murphda08' and rk = 60 and gcar = 264

--update s set s.pos = 'C'

--from [dbo].[BattingStatistics] as s
--join teamplayers as tp on tp.id = s.teamplayerid
--join players as p on tp.playerid = p.id
--join teams as t on tp.teamid = t.id

--where p.name = 'montemi01' and rk = 1 and gcar = 161