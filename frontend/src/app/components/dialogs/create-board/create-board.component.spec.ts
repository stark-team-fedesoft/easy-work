import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateBoardComponent } from './create-board.component';

describe('CreateBoardComponent', () => {
  let component: CreateBoardComponent;
  let fixture: ComponentFixture<CreateBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
