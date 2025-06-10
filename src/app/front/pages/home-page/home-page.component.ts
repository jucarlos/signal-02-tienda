import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductService } from '../../../products/services/product-service.service';



@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent  {


  public productsService = inject( ProductService );

  // rxresource



  // ngOnInit(): void {

  //   this.productsService.getProducts({})
  //   .subscribe ( resp => {
  //     console.log( resp );
    
  //   })
  // } 

  productsResource = rxResource({
    params: () => ({}),
    stream: () => {
      return this.productsService.getProducts({})
    }
  });



}
