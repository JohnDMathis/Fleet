using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Fleet.Controllers
{
    public class AppController : Controller
    {
        //
        // GET: /App/

        public ActionResult Index()
        {
#if (DEBUG)
            ViewBag.ReleaseMode = false;
#else
            ViewBag.ReleaseMode = true;
#endif
            return View();
        }

    }
}
