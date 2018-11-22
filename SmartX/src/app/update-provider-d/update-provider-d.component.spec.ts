import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProviderDComponent } from './update-provider-d.component';

describe('UpdateProviderDComponent', () => {
  let component: UpdateProviderDComponent;
  let fixture: ComponentFixture<UpdateProviderDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProviderDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProviderDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
