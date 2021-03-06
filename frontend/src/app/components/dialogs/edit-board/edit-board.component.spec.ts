import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditBoardComponent } from './edit-board.component';

describe('EditBoardComponent', () => {
  let component: EditBoardComponent;
  let fixture: ComponentFixture<EditBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
