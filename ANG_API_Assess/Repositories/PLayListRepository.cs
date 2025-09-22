using ANG_API_Assess.Interface;
using Microsoft.EntityFrameworkCore;
using StreamingAPI.Data;
using StreamingAPI.Models;
using System.Runtime.Serialization;

namespace ANG_API_Assess.Repositories
{
    public class PlaylistRepository : IStreaming<Playlist>
    {
        private readonly context _context;

        public PlaylistRepository(context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Playlist>> GetAllAsync()
        {
            return await _context.Playlists
                .Include(p => p.User)
                .Include(p => p.PlaylistMedias)
                .ThenInclude(pm => pm.Media)
                .ToListAsync();
        }

        public async Task<Playlist?> GetByIdAsync(int id)
        {
            return await _context.Playlists
                .Include(p => p.User)
                .Include(p => p.PlaylistMedias)
                .ThenInclude(pm => pm.Media)
                .FirstOrDefaultAsync(p => p.PlaylistId == id);
        }

        public async Task<Playlist> AddAsync(Playlist entity)
        {
            _context.Playlists.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Playlist> UpdateAsync(int id, Playlist entity)
        {
            var existing = await _context.Playlists.FindAsync(entity.PlaylistId);
            if (existing == null) throw new Exception("Playlist not found");

            existing.Name = entity.Name;
            existing.UserId = entity.UserId;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var playlist = await _context.Playlists.FindAsync(id);
            if (playlist == null) return false;

            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
