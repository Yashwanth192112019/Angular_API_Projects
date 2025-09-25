// playlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Playlist } from '../Models/Streaming.models';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'https://localhost:7192/api/Playlists';

  constructor(private http: HttpClient) {}

  getAllPlaylists(): Observable<Playlist[]> {
  return this.http.get<Playlist[]>(`${this.apiUrl}`).pipe(
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
  getPlaylists(): Observable<Playlist[]> {
    return this.getAllPlaylists();
  }

  // fetch a single playlist by id (the one you asked for)
  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/${id}`);
  }

  // optional helpers you might want later (create/update/delete)
 createPlaylist(name: string, mediaIds: number[], userId: number = 1): Observable<Playlist> {
    // 👈 must match PlaylistDto { name, userId, mediaIds }
    const body = {
      name: name,
      userId: userId,
      mediaIds: mediaIds
    };
    return this.http.post<Playlist>(this.apiUrl, body);
  }

  updatePlaylist(id: number, payload: Partial<Playlist>): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/${id}`, payload);
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
