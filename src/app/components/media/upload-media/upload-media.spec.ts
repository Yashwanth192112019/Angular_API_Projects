import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMedia } from './upload-media';

describe('UploadMedia', () => {
  let component: UploadMedia;
  let fixture: ComponentFixture<UploadMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
