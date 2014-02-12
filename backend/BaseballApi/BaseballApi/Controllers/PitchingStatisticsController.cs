using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using BaseballApi.Models;

namespace BaseballApi.Controllers
{
    public class PitchingStatisticsController : BaseController
    {
        public async Task<List<PitchingStatistic>> Get(int teamPlayerId)
        {
            var teams = await DbContext.PitchingStatistics.Where(s => s.TeamPlayerId == teamPlayerId).OrderBy(s => s.TimeStamp).ToListAsync();

            return teams;
        }
    }
}