using ANG_API_Assess.Interface;
using StreamingAPI.Models;

namespace ANG_API_Assess.Services
{
    public class PlaylistService
    {
        private readonly IStreaming<Playlist> _playlistRepository;

        public PlaylistService(IStreaming<Playlist> playlistRepository)
        {
            _playlistRepository = playlistRepository;
        }

        public async Task<IEnumerable<Playlist>> GetAllPlaylistsAsync()
        {
            return await _playlistRepository.GetAllAsync();
        }

        public async Task<Playlist?> GetPlaylistByIdAsync(int id)
        {
            return await _playlistRepository.GetByIdAsync(id);
        }

        public async Task<Playlist> AddPlaylistAsync(Playlist playlist)
        {
            return await _playlistRepository.AddAsync(playlist);
        }

        public async Task<Playlist> UpdatePlaylistAsync(int id, Playlist playlist)
        {
            return await _playlistRepository.UpdateAsync(id, playlist);
        }

        public async Task<bool> DeletePlaylistAsync(int id)
        {
            return await _playlistRepository.DeleteAsync(id);
        }
    }
}
