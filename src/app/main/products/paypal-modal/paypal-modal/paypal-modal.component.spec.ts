import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalModalComponent } from './paypal-modal.component';

describe('PaypalModalComponent', () => {
  let component: PaypalModalComponent;
  let fixture: ComponentFixture<PaypalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
