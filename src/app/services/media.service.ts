// media.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Media } from '../Models/Streaming.models';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'https://localhost:7192/api';

  constructor(private http: HttpClient) { }

  getAllMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/Media`).pipe(
      map(medias => medias.map(m => ({...m, 
        url: `https://localhost:7192${m.url}` // prepend backend URL
      })))
    );
  }

  uploadMedia(media: Media, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);  // this is for the actual media file
    formData.append('title', media.title);
    formData.append('mediaType', media.mediaType);
    formData.append('durationInMinutes', media.durationInMinutes.toString());
    formData.append('genre', media.genre);
    formData.append('releaseDate', media.releaseDate.toString());

    return this.http.post(`${this.apiUrl}/Media/upload`, formData);
  }
  
}
