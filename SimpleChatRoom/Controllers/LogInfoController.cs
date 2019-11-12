using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using SimpleChatRoom.MongoDB;

namespace SimpleChatRoom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogInfoController : ControllerBase
    {
        private LogInfoService logservice;
        public LogInfoController(LogInfoService _logservice)
        {
            logservice = _logservice;
        }
        [HttpPost]
        public ActionResult<bool> Create(LogInfo log)
        {
            try
            {
                logservice.Create(log);
            }
            catch(Exception ex)
            {
                var a = ex.Message;
                return false;
            }
            return true;
            //return CreatedAtRoute("Get", new { id = log.Account.ToString() }, log);
        }
        [HttpGet]
        public ActionResult<List<LogInfo>> Get() =>
            logservice.Get();
        [HttpGet("{id}")]
        public ActionResult<LogInfo> Get(string id) =>
            logservice.Get(id);
        [HttpGet("search/{id}")]
        public ActionResult<List<LogInfo>> search(string id) =>
            logservice.GetAnother(id);

        [HttpGet("{a}/{p}")]
        public ActionResult<LogInfo> Get(string a,string p)
        {
            var logInfo = logservice.Get(a, p);
            if(logInfo==null)
                return new LogInfo();
            return logInfo;
        }
    }
}
