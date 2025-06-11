import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product-service.service';
import { CarouselImagesComponent } from 'src/app/shared/components/carousel-images/carousel-images.component';


@Component({
  selector: 'app-product-page',
  imports: [ CarouselImagesComponent ],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {


    activatedRoute = inject(ActivatedRoute );
  productService = inject( ProductService );

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];


  productResource = rxResource({
    params: ( ) => ( { idSlug: this.productIdSlug }),
    stream: ( {params} ) => {
      console.log('jola' ,params );
      return this.productService.getProductByIdSlug( params.idSlug );
    }
  })



 }
