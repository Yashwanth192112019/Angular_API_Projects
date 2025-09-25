using ANG_API_Assess.Interface;
using StreamingAPI.Models;

namespace ANG_API_Assess.Services
{
    public class UserService
    {
        private readonly IStreaming<User> _userRepository;

        public UserService(IStreaming<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<User> AddUserAsync(User user)
        {
            // Additional business rules can go here if needed
            return await _userRepository.AddAsync(user);
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            return await _userRepository.UpdateAsync(id, user);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteAsync(id);
        }
    }
}
