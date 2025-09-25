using ANG_API_Assess.DTOs;
using ANG_API_Assess.Services;
using Microsoft.AspNetCore.Mvc;
using StreamingAPI.Models;
using System.Runtime.ConstrainedExecution;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;


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


        [HttpPost("upload")]
        public async Task<IActionResult> UploadMedia([FromForm] MediaUploadDto model)
        {
            if (model.File == null || model.File.Length == 0)
                return BadRequest("No file uploaded.");

            // Get extension from original file
            var extension = Path.GetExtension(model.File.FileName); // e.g. ".mp4" or ".mp3"
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "/media");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, model.File.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.File.CopyToAsync(stream);
            }

            var media = new Media
            {
                Title = model.Title,
                MediaType = model.MediaType,
                Url = $"/media/{model.File.FileName}",
                Genre = model.Genre,
                DurationInMinutes = model.DurationInMinutes,
                ReleaseDate = model.ReleaseDate
            };

            await _mediaService.AddMediaAsync(media);
            return Ok(media);
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
