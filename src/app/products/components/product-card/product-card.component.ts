import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../interfaces/product-response';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent { 


  product = input.required<Product>();

  imagen() {

    const url = `${environment.baseUrl}/files/product/${this.product().images[0]}`;
    console.log( url )
    return url;
  }



}
