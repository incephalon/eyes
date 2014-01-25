
print 'importing players'

insert into players(Name)
select distinct(player) from allBatting

print 'importing teams'

insert into Teams(Name)
select distinct(TM) from allBatting

print 'processing batting statistics'

declare @totalrows int, @counter int

	select @totalrows = count(*) from allBatting

print 'total rows ' + cast(@totalrows as varchar(10))

declare @failedBattingIds varchar(max), @failedPitchingIds varchar(max), @battingMessages varchar(max), @pitchingMessages varchar(max)
set @failedBattingIds = ''
set @failedPitchingIds = ''
set @battingMessages = ''
set @pitchingMessages = ''

declare @playerId int, @teamId int, @teamPlayerId int
		,@date datetime
			,@player varchar(50)
			--,@year varchar(50)
			  ,@Rk int
			  ,@Gcar int
			  ,@Gtm float
			  --,@Date varchar(50)
			  ,@Tm varchar(50)
			  ,@Column7 varchar(50)
			  ,@Opp varchar(50)
			  ,@Rslt varchar(50)
			  ,@score varchar(50)
			  ,@Inngs varchar(50)
			  ,@PA int
			  ,@AB int
			  ,@R int
			  ,@H int
			  ,@2B int
			  ,@3B int
			  ,@HR int
			  ,@RBI int
			  ,@BB int
			  ,@IBB int
			  ,@SO int
			  ,@HBP int
			  ,@SH int
			  ,@SF float
			  ,@ROE int
			  ,@GDP int
			  ,@SB int
			  ,@CS int
			  ,@BA float
			  ,@OBP float
			  ,@SLG float
			  ,@OPS float
			  ,@BOP int
			  ,@aLI float
			  ,@WPA float
			  ,@RE24 float
			  ,@id int

set @counter = 0
set @id = 0

while(@counter < @totalrows)
	begin
	
	begin try

		select top 1 
			@date = try_parse([year] + ' ' + REPLACE(REPLACE(REPLACE( [date], ' (1)', '' ), ' (2)', ''),'&nbsp;susp','') as datetime) 
				,@player = [player]
			  --,@year varchar(50)
			  ,@Rk = rk
			  ,@Gcar = Gcar
			  ,@Gtm = Left(gtm, 
							CASE 
								  WHEN CHARINDEX('&', Gtm) <> 0 
									 THEN CHARINDEX('&', Gtm) - 1
								  ELSE len(gtm)
							 END
							 )  
			  
			  --REPLACE(REPLACE(REPLACE( gtm, '&nbsp;(2)', '' ), '&nbsp;(1)', ''), '&nbsp;(3)', '')
			  ,@Tm = tm
			  ,@Column7 = [Column 7]
			  ,@Opp = Opp
			  ,@Rslt = Rslt
			  ,@score = score
			  ,@Inngs = Inngs
			  ,@PA = pa
			  ,@AB = ab
			  ,@R = r
			  ,@H = h
			  ,@2B = [2b]
			  ,@3B = [3b]
			  ,@HR = HR
			  ,@RBI = rbi
			  ,@BB = bb
			  ,@IBB = ibb
			  ,@SO = so
			  ,@HBP = hbp
			  ,@SH = sh
			  ,@SF = sf
			  ,@ROE = roe
			  ,@GDP = gdp
			  ,@SB = sb
			  ,@CS = cs
			  ,@BA = ba
			  ,@OBP = obp
			  ,@SLG = slg
			  ,@OPS = ops
			  ,@BOP = bop
			  ,@ali = TRY_PARSE([aLI] as float)
			  ,@wpa = TRY_PARSE([WPA] as float)
			  ,@re24 = TRY_PARSE( [RE24] as float)
			  ,@id = id
				
		from allBatting 
			where id > @id
			order by id

		select TOP 1 @playerId = id from players where name = @player
		select TOP 1 @teamId = id from teams where name = @Tm

		set @teamPlayerId = (select TOP 1 id from teamplayers where playerId = @playerId and teamId = @teamId)

		if(@teamPlayerId is NULL)
			begin
				insert into teamplayers(PlayerId, TeamId) 
				values (@playerId, @teamId)

				select @teamPlayerId = SCOPE_IDENTITY()
			end
		
		insert into BattingStatistics([TeamPlayerId],[TimeStamp],[Rk],[Gcar],[Gtm],[Column 7],[Opp],[Rslt],[score],[Inngs],[PA],[AB],[R],[H],[2B],[3B],[HR],[RBI],[BB],[IBB],[SO],[HBP],[SH],[SF],[ROE],[GDP],[SB],[CS],[BA],[OBP],[SLG],[OPS],[BOP],[aLI],[WPA],[RE24]) 
		values(@teamPlayerId,@date, @Rk,@Gcar ,@Gtm  ,@Column7 ,@Opp ,@Rslt ,@score ,@Inngs ,@PA ,@AB ,@R ,@H ,@2B ,@3B ,@HR ,@RBI ,@BB ,@IBB ,@SO ,@HBP ,@SH ,@SF ,@ROE ,@GDP ,@SB ,@CS ,@BA ,@OBP ,@SLG ,@OPS ,@BOP ,@aLI ,@WPA ,@RE24)

		set @counter = @counter + 1

	end try
	
	begin catch

		select top 1 @id = id from allBatting where id > @id order by id
		set @failedBattingIds = @failedBattingIds + cast( @id as varchar) + ','

		set @battingMessages = @battingMessages + 'ID:'+ cast( @id as varchar) + ' - ' + ERROR_MESSAGE() + CHAR(13)

	end catch

	end

print 'Processed ' + cast(@counter as varchar) + ' rows'
print 'Finished batting statistics transfer'





-- part 2

print 'processing pitching statistics'

	select @totalrows = count(*) from allPitching

print 'total rows ' + cast(@totalrows as varchar(10))

set @counter = 0
set @id = 0

declare @Dec varchar(50)
	  ,@DR smallint
	  ,@IP float
	  ,@ER smallint

	  --,@BB smallint
	  --,@SO smallint
	  --,@HR smallint
	  --,@HBP smallint

	  ,@ERA float
	  ,@BF smallint
	  ,@Pit smallint
	  ,@Str smallint
	  ,@StL smallint
	  ,@StS smallint
	  ,@GB smallint
	  ,@FB smallint
	  ,@LD smallint
	  ,@PU smallint
	  ,@Unk smallint
	  ,@GSc smallint
	  ,@IR smallint
	  ,@IS smallint

	  --,@SB smallint
	  --,@CS smallint
	  ,@PO smallint
	  --,@AB smallint
	  --,@2B smallint
	  --,@3B smallint
	  --,@IBB smallint
	  --,@GDP smallint
	  --,@SF smallint
	  --,@ROE smallint
	  --,@aLI float
	  --,@WPA float
	  --,@RE24 float

	  ,@Entered varchar(50)


while(@counter < @totalrows)
	begin
	
		begin try
			select top 1 
				@date = parse([year] + ' ' 
				+ REPLACE(REPLACE(REPLACE(REPLACE(date, '&nbsp;', ' '), '(1)', ''), '(2)', ''),' susp','') as datetime) 
					,@player = [player]
				  --,@year varchar(50)
				  ,@Rk = rk
				  ,@Gcar = Gcar
				  ,@Gtm = Left(gtm, 
								CASE 
									  WHEN CHARINDEX('&', Gtm) <> 0 
										 THEN CHARINDEX('&', Gtm) - 1
									  ELSE len(gtm)
								 END
								 )  
			  
				  --REPLACE(REPLACE(REPLACE( gtm, '&nbsp;(2)', '' ), '&nbsp;(1)', ''), '&nbsp;(3)', '')
				  ,@Tm = tm
				  ,@Column7 = [Column 7]
		  ,@opp = [Opp]
		  ,@rslt = [Rslt]
		  ,@score = [score]
		  ,@inngs =[Inngs]

		  ,@dec = [Dec]
		  ,@dr = [DR]
		  ,@ip = [IP]

		  ,@h =[H]
		  ,@r = [R]
		  ,@er = [ER]
		  ,@bb = [BB]
		  ,@so = [SO]
		  ,@hr = [HR]
		  ,@hbp = [HBP]
		  ,@era = TRY_PARSE( [ERA] as float)
		  ,@bf = [BF]
		  ,@pit = [Pit]
		  ,@str = [Str]
		  ,@stl = [StL]
		  ,@sts = [StS]
		  ,@gb = [GB]
		  ,@fb = [FB]
		  ,@ld = [LD]
		  ,@pu = [PU]
		  ,@unk = [Unk]
		  ,@gsc = [GSc]
		  ,@ir = [IR]
		  ,@is = [IS]
		  ,@sb = [SB]
		  ,@cs = [CS]
		  ,@po = [PO]
		  ,@ab = [AB]
		  ,@2b = [2B]
		  ,@3b = [3B]
		  ,@ibb = [IBB]
		  ,@gdp = [GDP]
		  ,@sf = [SF]
		  ,@roe = TRY_Parse([ROE] as smallint)
		  ,@ali = TRY_PARSE([aLI] as float)
		  ,@wpa = TRY_PARSE([WPA] as float)
		  ,@re24 = TRY_PARSE( [RE24] as float)
		  ,@Entered = [Entered]
		  ,@id = [id]
				
			from allPitching 
				where id > @id
				order by id

			select @playerId = id from players where name = @player
			select @teamId = id from teams where name = @Tm
			
			set @teamPlayerId = (select TOP 1 id from teamplayers where playerId = @playerId and teamId = @teamId)

			if(@teamPlayerId is NULL)
				begin
					insert into teamplayers(PlayerId, TeamId) 
					values (@playerId, @teamId)

					select @teamPlayerId = SCOPE_IDENTITY()
				end
		
			insert into PitchingStatistics([TeamPlayerId],[TimeStamp],[Rk],[Gcar],[Gtm],[Column 7],[Opp],[Rslt],[score],[Inngs],[Dec],[DR],[IP],[H],[R],[ER],[BB],[SO],[HR],[HBP],[ERA],[BF],[Pit],[Str],[StL],[StS],[GB],[FB],[LD],[PU],[Unk],[GSc],[IR],[IS],[SB],[CS],[PO],[AB],[2B],[3B],[IBB],[GDP],[SF],[ROE],[aLI],[WPA],[RE24],[Entered])
			values(@TeamPlayerId,@date,@Rk,@Gcar,@Gtm,@Column7,@Opp,@Rslt,@score,@Inngs,@Dec,@DR,@IP,@H,@R,@ER,@BB,@SO,@HR,@HBP,@ERA,@BF,@Pit,@Str,@StL,@StS,@GB,@FB,@LD,@PU,@Unk,@GSc,@IR,@IS,@SB,@CS,@PO,@AB,@2B,@3B,@IBB,@GDP,@SF,@ROE,@aLI,@WPA,@RE24,@Entered)

			set @counter = @counter + 1
		
		end try
	
		begin catch

			select top 1 @id = id from allPitching where id > @id order by id
			set @failedPitchingIds = @failedPitchingIds + cast( @id as varchar) + ','
			
			set @pitchingMessages = @pitchingMessages + 'ID:'+ cast( @id as varchar) + ' - ' + ERROR_MESSAGE() + CHAR(13)

		end catch

	end
	
print 'Processed ' + cast(@counter as varchar) + ' rows'

print 'Batting table errors'
print @battingMessages

print 'Pitching table errors'
print @pitchingMessages


print 'Failed batting ids: ' + @failedBattingIds
print 'Failed pitching ids: ' + @failedPitchingIds



print 'Finished'