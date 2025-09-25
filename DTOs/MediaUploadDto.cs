namespace ANG_API_Assess.DTOs
{
    public class MediaUploadDto
    {
        public IFormFile File { get; set; }
        public string Title { get; set; }
        public string MediaType { get; set; }
        public string Genre { get; set; }
        public int DurationInMinutes { get; set; }
        public DateTime ReleaseDate { get; set; }
    }

}
