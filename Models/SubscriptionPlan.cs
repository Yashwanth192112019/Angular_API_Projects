using System.ComponentModel.DataAnnotations;

namespace StreamingAPI.Models
{
    public class SubscriptionPlan
    {
        [Key]
        public int SubscriptionPlanId { get; set; }

        [Required, StringLength(50)]
        public string PlanName { get; set; } // Free, Premium, Family

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int MaxDevices { get; set; }

        [Required]
        public bool IsDownloadAllowed { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
