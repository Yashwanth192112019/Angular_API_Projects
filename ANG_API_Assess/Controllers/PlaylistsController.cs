using Microsoft.AspNetCore.Mvc;
using StreamingAPI.Models;
using ANG_API_Assess.Services;
using ANG_API_Assess.DTOs;

namespace StreamingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        private readonly PlaylistService _playlistService;

        public PlaylistsController(PlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var playlists = await _playlistService.GetAllPlaylistsAsync();
            return Ok(playlists);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var playlist = await _playlistService.GetPlaylistByIdAsync(id);
            if (playlist == null) return NotFound();
            return Ok(playlist);
        }

        [HttpPost]
        public async Task<IActionResult> Add(PlaylistDto play)
        {
            var obj = new Playlist
            {
                Name = play.Name,
                UserId = play.UserId
            };

            var created = await _playlistService.AddPlaylistAsync(obj);
            return CreatedAtAction(nameof(Get), new { id = created.PlaylistId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PlaylistDto play)
        {
            var obj = new Playlist
            {
                Name = play.Name,
                UserId = play.UserId
            };

            if (id != obj.PlaylistId) return BadRequest();
            var updated = await _playlistService.UpdatePlaylistAsync(id, obj);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _playlistService.DeletePlaylistAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
