using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChatRoom.Controllers
{
    [ApiController]
    [Route("File")]
    //[EnableCors("AllowSpecificOrigin")]
    public class FileController : ControllerBase
    {
        private readonly static Dictionary<string, string> _contentTypes = new Dictionary<string, string>
        {
            {".png", "image/png"},
            {".jpg", "image/jpeg"},
            {".jpeg", "image/jpeg"}
        };
        private readonly string _folder;
        private readonly string _default;

        public FileController(IWebHostEnvironment env)
        {
            // 把上傳目錄設為：wwwroot\UploadFolder
            _folder = $@"./ClientApp/public/Image/";
            _default = $@"./ClientApp/public/Image/Deafult.png";
        }

        [HttpPost("{id}")]
        public ActionResult Upload(string id)
        {
            //System.IO.File.OpenRead(_default);
            Stream fs = System.IO.File.OpenRead(_default);
            var fileName = id + ".png";
            if (Request.Form.Files.Count>0)
            {
                var file = Request.Form.Files[0];
                long size = file.Length;
                fs = file.OpenReadStream();
                fileName = fileName + "." + file.ContentType.Split('/')[1];
            }

            if (!Directory.Exists(_folder))
            {
                Directory.CreateDirectory(_folder);
            }
            
            string fileFullName = _folder + fileName;
            using (FileStream target = System.IO.File.Create(fileFullName))
            {
                fs.CopyTo(target);
            }

            return Ok(new {n= fileName });
        }

    }

}
