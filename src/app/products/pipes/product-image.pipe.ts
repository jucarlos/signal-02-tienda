import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';


@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): string {

    const baseUrl = environment.baseUrl;

    if ( typeof value === 'string'){
      return `${baseUrl}/files/product/${value}`;
    }
    const image = value[0];
    if ( !image ){
      return './assets/img/no-image.jpg';
    }

    return `${baseUrl}/files/product/${image}`;

  }

}
