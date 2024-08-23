import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-owl-carousel-slider',
  templateUrl: './owl-carousel-slider.component.html',
  styleUrls: ['./owl-carousel-slider.component.scss'],
})
export class OwlCarouselSliderComponent {
  @Input() data: any[] | undefined;
  getAllProducts: any;
  constructor() {
    const allProducts = localStorage.getItem('trendingProducts');

    if (allProducts !== null) {
      this.getAllProducts = JSON.parse(allProducts);
      console.log(this.getAllProducts);
    } else {
      console.log('no trending product found');
      console.error('No trendingProducts found in localStorage');
    }
  }
}
