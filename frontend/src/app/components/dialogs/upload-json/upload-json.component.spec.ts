import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadJsonComponent } from './upload-json.component';

describe('UploadJsonComponent', () => {
  let component: UploadJsonComponent;
  let fixture: ComponentFixture<UploadJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
