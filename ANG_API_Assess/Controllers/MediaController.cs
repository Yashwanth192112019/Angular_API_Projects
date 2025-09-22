using Microsoft.AspNetCore.Mvc;
using StreamingAPI.Models;
using ANG_API_Assess.Services;
using ANG_API_Assess.DTOs;

namespace StreamingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly MediaService _mediaService;

        public MediaController(MediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var media = await _mediaService.GetAllMediaAsync();
            return Ok(media);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var m = await _mediaService.GetMediaByIdAsync(id);
            if (m == null) return NotFound();
            return Ok(m);
        }

        [HttpPost]
        public async Task<IActionResult> Add(MediaDto med)
        {
            var cer = new Media
            {
                MediaType = med.MediaType,
                Title = med.Title,
                Url = med.Url,
                DurationInMinutes = med.DurationInMinutes,
                Genre = med.Genre,
                ReleaseDate = med.ReleaseDate
            };

            var created = await _mediaService.AddMediaAsync(cer);
            return CreatedAtAction(nameof(Get), new { id = created.MediaId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MediaDto med)
        {
            var cer = new Media
            {
                MediaType = med.MediaType,
                Title = med.Title,
                Url = med.Url,
                DurationInMinutes = med.DurationInMinutes,
                Genre = med.Genre,
                ReleaseDate = med.ReleaseDate
            };

            if (id != cer.MediaId) return BadRequest();
            var updated = await _mediaService.UpdateMediaAsync(id, cer);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _mediaService.DeleteMediaAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
