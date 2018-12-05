import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupondialogiComponent } from './cupondialogi.component';

describe('CupondialogiComponent', () => {
  let component: CupondialogiComponent;
  let fixture: ComponentFixture<CupondialogiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupondialogiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupondialogiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
