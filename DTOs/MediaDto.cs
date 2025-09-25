using System.ComponentModel.DataAnnotations;

namespace ANG_API_Assess.DTOs
{
    public class MediaDto
    {

        public string? Title { get; set; }

        public string? MediaType { get; set; } // Music, Video, Podcast

        public string? Url { get; set; } // Path/stream URL

        public int DurationInMinutes { get; set; }

        public string? Genre { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}
