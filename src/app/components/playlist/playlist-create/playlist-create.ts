import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../../services/playlist.service';
import { MediaService } from '../../../services/media.service';
import { Media } from '../../../Models/Streaming.models';
import { PlaylistListComponent } from "../playlist-list/playlist-list";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-create',
  standalone: true,
  imports: [CommonModule, FormsModule, PlaylistListComponent],
  templateUrl: './playlist-create.html',
  styleUrls: ['./playlist-create.css']
})
export class PlaylistCreateComponent implements OnInit {

  playlistName: string = '';
  selectedMediaIds: number[] = [];
  allMedia: Media[] = [];
  filteredMedia: Media[] = [];
  selectedMediaType: string = ''; // Music, Video, or ''

  constructor(private playlistService: PlaylistService, private mediaService: MediaService, private router: Router) {}

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia() {
    this.mediaService.getAllMedia().subscribe(media => {
      this.allMedia = media;
      this.filteredMedia = media; // initially show all
    });
  }

  filterMedia() {
    if (this.selectedMediaType) {
      this.filteredMedia = this.allMedia.filter(media => media.mediaType === this.selectedMediaType);
    } else {
      this.filteredMedia = [...this.allMedia]; // all media if no filter
    }
  }

  toggleMedia(mediaId: number, event: any) {
    if (event.target.checked) {
      this.selectedMediaIds.push(mediaId);
    } else {
      this.selectedMediaIds = this.selectedMediaIds.filter(id => id !== mediaId);
    }
  }

  createPlaylist() {
    if (!this.playlistName || this.selectedMediaIds.length === 0) return;

    this.playlistService.createPlaylist(this.playlistName, this.selectedMediaIds, 1) // pass userId (mocked for now)
      .subscribe((playlist) => {
        alert(`Playlist "${playlist.name}" created successfully with ${playlist.playlistMedias?.length || 0} media!`);
        this.playlistName = '';
        this.selectedMediaIds = [];
        this.filterMedia(); // reset filter if needed
      });
  }

  uploadmedia() {
    this.router.navigate(['/upload-media']);
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }
}
