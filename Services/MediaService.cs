using ANG_API_Assess.Interface;
using StreamingAPI.Models;

namespace ANG_API_Assess.Services
{
    public class MediaService
    {
        private readonly IStreaming<Media> _mediaRepository;

        public MediaService(IStreaming<Media> mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        public async Task<IEnumerable<Media>> GetAllMediaAsync()
        {
            return await _mediaRepository.GetAllAsync();
        }

        public async Task<Media?> GetMediaByIdAsync(int id)
        {
            return await _mediaRepository.GetByIdAsync(id);
        }

        public async Task<Media> AddMediaAsync(Media media)
        {
            return await _mediaRepository.AddAsync(media);
        }

        public async Task<Media> UpdateMediaAsync(int id, Media media)
        {
            return await _mediaRepository.UpdateAsync(id, media);
        }

        public async Task<bool> DeleteMediaAsync(int id)
        {
            return await _mediaRepository.DeleteAsync(id);
        }
    }
}
