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
            var players = await DbContext.TeamPlayers.Where(tp => tp.TeamId == teamId).Include(tp => tp.Player).
                                          Select(tp => new TeamPlayerViewModel { TeamPlayerId = tp.Id, Name = tp.Player.Name }).ToListAsync();

            return players;
        }
    }
}