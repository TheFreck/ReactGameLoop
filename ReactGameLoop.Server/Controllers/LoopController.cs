using Microsoft.AspNetCore.Mvc;

namespace ReactGameLoop.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoopController : ControllerBase
    {
        public LoopController()
        {
            
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("You Got Me");
        }
    }
}
