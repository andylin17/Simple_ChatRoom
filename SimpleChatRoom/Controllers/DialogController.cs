using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using SimpleChatRoom.MongoDB;

namespace SimpleChatRoom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DialogController : ControllerBase
    {
        private DialogService dialogservice;
        public DialogController(DialogService _dialogservice)
        {
            dialogservice = _dialogservice;
        }

        [HttpGet]
        public ActionResult<List<Dialog>> Get() =>
            dialogservice.Get();

        [HttpGet("{id}")]
        public ActionResult<List<Dialog>> Get(string id) =>
            dialogservice.Get(id);

        [HttpPost("{id}")]
        public void Update(string id,[FromBody]Dialog log)
        {
            dialogservice.Update(id,log);
        }
        [HttpPost]
        public ActionResult Create([FromBody]Dialog log)
        {
            try
            {
                dialogservice.Create(log);
                return Ok();
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}
