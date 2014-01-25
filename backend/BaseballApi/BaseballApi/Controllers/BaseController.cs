using System.Web.Http;
using BaseballApi.Models;

namespace BaseballApi.Controllers
{
    public abstract class BaseController : ApiController
    {
        protected baseballEntities DbContext { get; private set; }

        protected BaseController()
        {
            DbContext = new baseballEntities();
            DbContext.Configuration.ProxyCreationEnabled = false; 
        }

        protected override void Dispose(bool disposing)
        {
            DbContext.Dispose();
            base.Dispose(disposing);
        }
    }
}