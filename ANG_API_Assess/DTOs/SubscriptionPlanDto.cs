using System.ComponentModel.DataAnnotations;

namespace ANG_API_Assess.DTOs
{
    public class SubscriptionPlanDto
    {
        public string PlanName { get; set; } 

        public decimal Price { get; set; }

        public int MaxDevices { get; set; }

        public bool IsDownloadAllowed { get; set; }
    }
}
