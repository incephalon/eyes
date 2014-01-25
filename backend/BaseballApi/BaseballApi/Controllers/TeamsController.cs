using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using BaseballApi.Models;

namespace BaseballApi.Controllers
{
    public class TeamsController : BaseController
    {
        public async Task<List<Team>> Get()
        {
            var teams = await DbContext.Teams.ToListAsync();

            return teams;
        }
    }
}