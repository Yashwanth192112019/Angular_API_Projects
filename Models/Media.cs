using System.ComponentModel.DataAnnotations;

namespace StreamingAPI.Models
{
    public class Media
    {
        [Key]
        public int MediaId { get; set; }

        [Required, StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(30)]
        public string MediaType { get; set; } // Music, Video, Podcast

        [Required]
        [StringLength(450)]
        public string Url { get; set; } // Path/stream URL

        [Range(1, 1000)]
        public int DurationInMinutes { get; set; }

        [StringLength(50)]
        public string Genre { get; set; }

        public DateTime ReleaseDate { get; set; }

        public ICollection<PlaylistMedia> PlaylistMedias { get; set; }
    }
}
