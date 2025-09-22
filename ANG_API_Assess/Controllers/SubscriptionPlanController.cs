using Microsoft.AspNetCore.Mvc;
using StreamingAPI.Models;
using ANG_API_Assess.Services;
using ANG_API_Assess.DTOs;

namespace StreamingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionPlansController : ControllerBase
    {
        private readonly SubscriptionPlanService _planService;

        public SubscriptionPlansController(SubscriptionPlanService planService)
        {
            _planService = planService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _planService.GetAllPlansAsync();
            return Ok(plans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var plan = await _planService.GetPlanByIdAsync(id);
            if (plan == null) return NotFound();
            return Ok(plan);
        }

        [HttpPost]
        public async Task<IActionResult> Add(SubscriptionPlanDto plan)
        {
            var sub = new SubscriptionPlan
            {
                PlanName = plan.PlanName,
                IsDownloadAllowed = plan.IsDownloadAllowed,
                MaxDevices = plan.MaxDevices,
                Price = plan.Price,
            };
            var created = await _planService.AddPlanAsync(sub);
            return CreatedAtAction(nameof(Get), new { id = created.SubscriptionPlanId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SubscriptionPlanDto plan)
        {
            var sub = new SubscriptionPlan
            {
                PlanName = plan.PlanName,
                IsDownloadAllowed = plan.IsDownloadAllowed,
                MaxDevices = plan.MaxDevices,
                Price = plan.Price,
            };


            if (id != sub.SubscriptionPlanId) return BadRequest();
            var updated = await _planService.UpdatePlanAsync(id, sub);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _planService.DeletePlanAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
