// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from '../../../Models/Streaming.models';
import { Playlist } from '../../../Models/Streaming.models';
import { AuthService } from '../../../services/auth.service';
import { MediaService } from '../../../services/media.service';
import { PlaylistService } from '../../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaListComponent } from "../../media/media-list/media-list";
import { PlaylistListComponent } from "../../playlist/playlist-list/playlist-list";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MediaListComponent, PlaylistListComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  songs: Media[] = [];
  videos: Media[] = [];
  playlists: Playlist[] = [];

  constructor(
    private mediaService: MediaService,
    private playlistService: PlaylistService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSongs();
    this.loadVideos();
    this.loadPlaylists();
  }

  loadSongs() {
    this.mediaService.getAllMedia().subscribe((data: Media[]) => {
      this.songs = data.filter(m => m.mediaType === 'Music');
    });
  }

  loadVideos() {
    this.mediaService.getAllMedia().subscribe((data: Media[]) => {
      this.videos = data.filter(m => m.mediaType === 'Video');
    });
  }

  loadPlaylists() {
    this.playlistService.getAllPlaylists().subscribe({
      next: (data: Playlist[]) => {
        this.playlists = data;
      },
      error: (err) => {
        console.error('Error fetching playlists', err);
      }
    });
  }
  goPremium() {
    this.router.navigate(['/user/subscription']);
  }

  logout() {
    this.authService.logout();
  }
}
