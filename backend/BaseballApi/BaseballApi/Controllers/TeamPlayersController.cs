using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using BaseballApi.Models;

namespace BaseballApi.Controllers
{
    public class TeamPlayersController : BaseController
    {
        public async Task<List<TeamPlayerViewModel>> Get(int teamId)
        {
            var players = await DbContext.TeamPlayers.Where(tp => tp.TeamId == teamId)
                                         .Include(tp => tp.Player)
                                         .Include(tp => tp.TeamPlayerPeriods).ToListAsync();

            return players.ConvertAll(ToViewModel);
        }

        private TeamPlayerViewModel ToViewModel(TeamPlayer teamPlayer)
        {
            var years = teamPlayer.TeamPlayerPeriods.SelectMany(p => Enumerable.Range(p.FromYear, (p.ToYear ?? DateTime.Today.Year) - p.FromYear + 1))
                .Distinct().ToList();

            return new TeamPlayerViewModel { TeamPlayerId = teamPlayer.Id, Name = teamPlayer.Player.RealName, Years = years };
        }
    }
}