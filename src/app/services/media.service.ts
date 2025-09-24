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
  
}
