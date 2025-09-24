// playlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Playlist } from '../Models/Streaming.models';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'https://localhost:7192/api';

  constructor(private http: HttpClient) {}

  getAllPlaylists(): Observable<Playlist[]> {
  return this.http.get<Playlist[]>(`${this.apiUrl}/Playlists`).pipe(
    map(playlists =>
      playlists.map(p => ({
        ...p,
        playlistMedias: p.playlistMedias?.map(pm => ({
          ...pm,
          media: {
            ...pm.media,
            url: `https://localhost:7192${pm.media.url}` // prepend backend base URL
          }
        }))
      }))
    )
  );
}

}
