import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlCarouselSliderComponent } from './owl-carousel-slider.component';

describe('OwlCarouselSliderComponent', () => {
  let component: OwlCarouselSliderComponent;
  let fixture: ComponentFixture<OwlCarouselSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwlCarouselSliderComponent]
    });
    fixture = TestBed.createComponent(OwlCarouselSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
