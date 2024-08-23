import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypaymentsComponent } from './mypayments.component';

describe('MypaymentsComponent', () => {
  let component: MypaymentsComponent;
  let fixture: ComponentFixture<MypaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MypaymentsComponent]
    });
    fixture = TestBed.createComponent(MypaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
