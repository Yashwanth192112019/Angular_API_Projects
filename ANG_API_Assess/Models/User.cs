using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required, StringLength(50)]
        public string UserName { get; set; }

        [Required, EmailAddress, StringLength(100)]
        public string Email { get; set; }

        [Required, StringLength(255)]
        public string PasswordHash { get; set; }  // Store hash, not plain text

        [Required]
        [StringLength(50)]
        public string Role { get; set; } // Admin, Creator, Subscriber

        // FK to SubscriptionPlan
        public int? SubscriptionPlanId { get; set; }

        [ForeignKey(nameof(SubscriptionPlanId))]
        public SubscriptionPlan SubscriptionPlan { get; set; }

        public ICollection<Playlist> Playlists { get; set; }

    }
}
