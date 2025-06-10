import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductsResponse } from '../interfaces/product-response';

interface OptionRequest {
  limit?: number,
  offset?: number,
  gender?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private http = inject( HttpClient );



  getProducts(options: OptionRequest): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;

    const url = `${environment.baseUrl}/products`;

    return this.http.get<ProductsResponse>( url , {
      params: {
        limit,
        offset,
        gender,
      }
    } ).pipe(
      catchError( ( error ) => {
        console.log( error );
        return throwError( () => new Error ('Pues algo ha ido mal....'))
      })
    )
    
    
    ;


  }



}
