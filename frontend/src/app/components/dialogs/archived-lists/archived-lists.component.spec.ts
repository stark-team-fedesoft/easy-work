import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedListsComponent } from './archived-lists.component';

describe('ArchivedListsComponent', () => {
  let component: ArchivedListsComponent;
  let fixture: ComponentFixture<ArchivedListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
