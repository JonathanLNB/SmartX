import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDialogIComponent } from './product-dialog-i.component';

describe('ProductDialogIComponent', () => {
  let component: ProductDialogIComponent;
  let fixture: ComponentFixture<ProductDialogIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDialogIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
