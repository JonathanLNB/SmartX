import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDialogIComponent } from './provider-dialog-i.component';

describe('ProviderDialogIComponent', () => {
  let component: ProviderDialogIComponent;
  let fixture: ComponentFixture<ProviderDialogIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDialogIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDialogIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
