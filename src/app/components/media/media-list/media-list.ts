// media-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../../Models/Streaming.models';
import { MediaService } from '../../../services/media.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-media-list',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './media-list.html',
  styleUrls: ['./media-list.css']
})
export class MediaListComponent implements OnInit {
  @Input() mediaType!: string; // "song" or "video"
  media: Media[] = [];

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaService.getAllMedia().subscribe(data => {
      this.media = data;
    });
  }
}
