// playlist-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../Models/Streaming.models';
import { PlaylistService } from '../../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-playlist-list',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './playlist-list.html',
  styleUrls: ['./playlist-list.css']
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private router : Router) {}

  ngOnInit(): void {
    this.playlistService.getAllPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/playlists', id]);
  }
}
