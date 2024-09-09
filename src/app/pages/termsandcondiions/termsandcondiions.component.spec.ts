import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandcondiionsComponent } from './termsandcondiions.component';

describe('TermsandcondiionsComponent', () => {
  let component: TermsandcondiionsComponent;
  let fixture: ComponentFixture<TermsandcondiionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsandcondiionsComponent]
    });
    fixture = TestBed.createComponent(TermsandcondiionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
