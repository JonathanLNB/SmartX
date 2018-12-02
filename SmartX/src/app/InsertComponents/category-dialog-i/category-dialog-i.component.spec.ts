import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDialogIComponent } from './category-dialog-i.component';

describe('CategoryDialogIComponent', () => {
  let component: CategoryDialogIComponent;
  let fixture: ComponentFixture<CategoryDialogIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDialogIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDialogIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
