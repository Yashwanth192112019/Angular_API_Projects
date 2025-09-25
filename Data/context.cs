using Microsoft.EntityFrameworkCore;
using StreamingAPI.Models;

namespace StreamingAPI.Data
{
    public class context : DbContext
    {
        public context(DbContextOptions<context> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistMedia> PlaylistMedias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Table names
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<SubscriptionPlan>().ToTable("SubscriptionPlans");
            modelBuilder.Entity<Media>().ToTable("Media");
            modelBuilder.Entity<Playlist>().ToTable("Playlists");
            modelBuilder.Entity<PlaylistMedia>().ToTable("PlaylistMedias");

            // Relationships
            modelBuilder.Entity<User>() 
                .HasOne(u => u.SubscriptionPlan)
                .WithMany(sp => sp.Users)
                .HasForeignKey(u => u.SubscriptionPlanId);

            modelBuilder.Entity<Playlist>()
                .HasOne(p => p.User)
                .WithMany(u => u.Playlists)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<PlaylistMedia>()
                .HasKey(pm => new { pm.PlaylistId, pm.MediaId });

            modelBuilder.Entity<PlaylistMedia>()
                .HasOne(pm => pm.Playlist)
                .WithMany(p => p.PlaylistMedias)
                .HasForeignKey(pm => pm.PlaylistId);

            modelBuilder.Entity<PlaylistMedia>()
                .HasOne(pm => pm.Media)
                .WithMany(m => m.PlaylistMedias)
                .HasForeignKey(pm => pm.MediaId);

            modelBuilder.Entity<SubscriptionPlan>().HasData(
                new SubscriptionPlan { SubscriptionPlanId = 1, PlanName = "Free", Price = 0, MaxDevices = 1, IsDownloadAllowed = false },
                new SubscriptionPlan { SubscriptionPlanId = 2, PlanName = "Premium", Price = 9.99m, MaxDevices = 3, IsDownloadAllowed = true },
                new SubscriptionPlan { SubscriptionPlanId = 3, PlanName = "Family", Price = 14.99m, MaxDevices = 5, IsDownloadAllowed = true }
            );

            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, UserName = "AdminUser", Email = "admin@stream.com", PasswordHash = "hashedpass1", Role = "Admin", SubscriptionPlanId = 2 },
                new User { UserId = 2, UserName = "JohnDoe", Email = "john@example.com", PasswordHash = "hashedpass2", Role = "Subscriber", SubscriptionPlanId = 1 }
            );

            modelBuilder.Entity<Media>().HasData(
                new Media { MediaId = 1, Title = "Shape of You", MediaType = "Music", Url = "/media/shapeofyou.mp3", DurationInMinutes = 4, Genre = "Pop", ReleaseDate = new DateTime(2017, 1, 6) },
                new Media { MediaId = 2, Title = "Inception", MediaType = "Video", Url = "/media/inception.mp4", DurationInMinutes = 148, Genre = "Sci-Fi", ReleaseDate = new DateTime(2010, 7, 16) }
            );

            modelBuilder.Entity<Playlist>().HasData(
                new Playlist { PlaylistId = 1, Name = "Favorites", UserId = 2 }
            );

            modelBuilder.Entity<PlaylistMedia>().HasData(
                new PlaylistMedia { PlaylistId = 1, MediaId = 1 },
                new PlaylistMedia { PlaylistId = 1, MediaId = 2 }
            );
        }
    }
}
