import { Component } from '@angular/core';
import { MediaService } from '../../../services/media.service';
import { Media } from '../../../Models/Streaming.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-media',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './upload-media.html',
  styleUrls: ['./upload-media.css']
})

export class UploadMediaComponent {

  media: Media = {
    mediaId: 0,
    title: '',
    mediaType: '',
    url: '',
    durationInMinutes: 0,
    genre: '',
    releaseDate:  new Date().toISOString(), // always current date
    playListMedias: []
  };

  selectedFile: File | null = null;
  uploadMessage: string = '';
  isFileChosen: boolean = false;

  constructor(private mediaService: MediaService, private router: Router) {}

  // File selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.isFileChosen = true;

    if (this.selectedFile) {
      // Auto-detect type
      if (this.selectedFile.type.startsWith('audio')) {
        this.media.mediaType = 'Music';
        this.getMediaDuration('audio');
      } else if (this.selectedFile.type.startsWith('video')) {
        this.media.mediaType = 'Video';
        this.getMediaDuration('video');
      } else {
        this.uploadMessage = 'Unsupported file type!';
        this.removeFile();
      }

      // Set release date to current
      this.media.releaseDate = new Date().toISOString();
    }
  }

  // Calculate media duration
  private getMediaDuration(type: 'audio' | 'video') {
    const url = URL.createObjectURL(this.selectedFile!);
    let element: HTMLMediaElement;

    if (type === 'audio') {
      element = document.createElement('audio');
    } else {
      element = document.createElement('video');
    }

    element.src = url;
    element.onloadedmetadata = () => {
      const durationInSeconds = element.duration;
      this.media.durationInMinutes = Math.ceil(durationInSeconds / 60);
      URL.revokeObjectURL(url); // cleanup
    };
  }

  // Remove selected file
  // Remove selected file
removeFile(fileInput?: HTMLInputElement) {
  this.selectedFile = null;
  this.isFileChosen = false;
  this.media.mediaType = '';
  this.media.durationInMinutes = 0;

  // Reset the file input field if reference is given
  if (fileInput) {
    fileInput.value = '';
  }
}



  // Upload media
  onSubmit() {
    if (!this.selectedFile) {
        this.uploadMessage = 'Please select a file.';
        return;
    }

    this.media.releaseDate = new Date().toISOString(); // ✅ FIX

    this.mediaService.uploadMedia(this.media, this.selectedFile)
        .subscribe({
            next: () => {
                this.uploadMessage = 'Upload successful!';
                this.removeFile();
            },
            error: (err) => {
                console.error(err);
                this.uploadMessage = 'Upload failed. Please try again.';
            }
        });
}



  logout() {
    this.router.navigate(['/auth/login']);
  }

  getplaylists() {
    this.router.navigate(['/playlist-create']);
  }

  gotoDashboard(){
    this.router.navigate(['/user/dashboard'])
  }


}