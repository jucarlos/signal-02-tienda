import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product-service.service';
import { tap, map} from 'rxjs';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, AlertComponent],
  templateUrl: './gender-page.component.html',
  styleUrls: ['./gender-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent { 


     activatedRoute = inject( ActivatedRoute );
   productsService = inject( ProductService );

   gender = toSignal(
    this.activatedRoute.params
      .pipe(
        map( ( {gender} ) =>{
          return gender 
        } )
      )
   );


   productsResource = rxResource({
    // tengo questar pendiente de this.gender y lo llamo gender
    
    params: () => ( this.gender() ),
    stream: ( { params } ) => {

      console.log( 'En el ***' ,params );
      return this.productsService.getProducts({
        gender: params
      }).pipe(
        tap( () => {
          console.log('A ver que sale')
        })
      );
    } });






}
