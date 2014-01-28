using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BaseballApi.Models;

namespace BaseballApi.Controllers
{
    public class BattingStatisticsController : BaseController
    {
        public async Task<List<BattingStatistic>> Get(int teamPlayerId, int? year = null)
        {
            var teams = await DbContext.BattingStatistics.Where(BuildQuery(teamPlayerId, year)).ToListAsync();

            return teams;
        }

        private Expression<Func<BattingStatistic, bool>> BuildQuery(int teamPlayerId, int? year)
        {
            if (year == null)
            {
                return s => s.TeamPlayerId == teamPlayerId;
            }

            return s => s.TeamPlayerId == teamPlayerId && s.TimeStamp.Year >= year && s.TimeStamp.Year < year + 1;
        }
    }
}