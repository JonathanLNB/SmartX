import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupondialogUComponent } from './cupondialog-u.component';

describe('CupondialogUComponent', () => {
  let component: CupondialogUComponent;
  let fixture: ComponentFixture<CupondialogUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupondialogUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupondialogUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
