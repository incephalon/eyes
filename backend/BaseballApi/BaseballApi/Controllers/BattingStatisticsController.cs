using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using BaseballApi.Models;

namespace BaseballApi.Controllers
{
    public class BattingStatisticsController : BaseController
    {
        public async Task<List<BattingStatistic>> Get(int teamPlayerId)
        {
            var teams = await DbContext.BattingStatistics.Where(s => s.TeamPlayerId == teamPlayerId).ToListAsync();

            return teams;
        }
    }
}