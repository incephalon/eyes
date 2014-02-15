using System.Collections.Generic;

namespace BaseballApi.Models
{
    public class TeamPlayerViewModel
    {
        public int TeamPlayerId { get; set; }
        public string Name { get; set; }
        public List<int> Years { get; set; }
    }
}