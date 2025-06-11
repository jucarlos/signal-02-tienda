import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';



import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';


@Component({
  selector: 'carousel-images',
  imports: [ ProductImagePipe ],
  templateUrl: './carousel-images.component.html',
  styleUrls: ['./carousel-images.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselImagesComponent implements AfterViewInit {


  images = input.required<string[]>();
  divSwiper = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit(): void {
    
    const element = this.divSwiper().nativeElement;
    if(!element) return;

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });


  }


}

