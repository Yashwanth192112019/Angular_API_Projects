import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, Playlist } from '../../../Models/Streaming.models';
import { PlaylistService } from '../../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist-detail.html',
  styleUrls: ['./playlist-detail.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlist!: Playlist;
  currentMedia!: Media | null;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(id).subscribe((data) => {
      this.playlist = data;
    });
  }

  playMedia(media: Media) {
    this.currentMedia = {
      ...media,
      url: `https://localhost:7192${media.url}`
    };
  }

  isAudio(mediaType: string | undefined): boolean {
    return mediaType === 'Music';
  }

  isVideo(mediaType: string | undefined): boolean {
    return mediaType === 'Video';
  }

  openPlayer(media: Media) {
    this.currentMedia = {
      ...media,
      url: `https://localhost:7192${media.url}`
    };
  }

  closePlayer() {
    this.currentMedia = null;
  }

}