import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMedia } from './manage-media';

describe('ManageMedia', () => {
  let component: ManageMedia;
  let fixture: ComponentFixture<ManageMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
