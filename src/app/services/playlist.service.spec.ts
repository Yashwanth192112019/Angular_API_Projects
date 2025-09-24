import { TestBed } from '@angular/core/testing';
import { PlaylistService } from './playlist.service.js';


describe('PlaylistServiceTs', () => {
  let service: PlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
