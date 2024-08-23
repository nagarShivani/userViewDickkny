import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInquiryComponent } from './bulk-inquiry.component';

describe('BulkInquiryComponent', () => {
  let component: BulkInquiryComponent;
  let fixture: ComponentFixture<BulkInquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkInquiryComponent]
    });
    fixture = TestBed.createComponent(BulkInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
