import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


type AuthStatus = 'checking' | 'authenticated' | 'non-authenticated';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject( HttpClient );

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>( localStorage.getItem('token') );

  saveToLocalStorage = effect( () => {
    console.log('Pasando por el efecto');
    localStorage.setItem('token', this._token() ?? '')
  })


  checkStatusResource = rxResource({
    stream: () => this.checkStatus() 
  });

  authStatus = computed<AuthStatus>( () => {

    if ( this._authStatus() === 'checking') return 'checking';

    if ( this._user() ) {
      return 'authenticated';
    }

    return 'non-authenticated';

  });

  user = computed<User | null>( this._user );
  token = computed<string | null>( () => this._token() ) 


  logout() {

    this._authStatus.set('non-authenticated');
    this._token.set( null );
    this._user.set( null );

    localStorage.removeItem('token');
  }

  private loginSuccess( resp: AuthResponse) {
        this._authStatus.set('authenticated');
        this._user.set(resp.user);
        this._token.set( resp.token );
 }

  private authError( error: any ) {
    this.logout();
    return of ( false );

  }

  checkStatus(): Observable<boolean> {

    console.log('Dentro del check status');

    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of ( false ); 
    }

    const url = `${environment.baseUrl}/auth/check-status`;

    return this.http.get<AuthResponse>( url, 
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      // }
  )
    .pipe(

      tap( ( resp ) => {
        this.loginSuccess( resp );
      }),
      map( () => true ),
     
      catchError( ( error ) => {
        return this.authError( error );
      })

    );


  }


  login( email: string, password: string ): Observable<boolean> {

    const url = `${environment.baseUrl}/auth/login`;

    return this.http.post<AuthResponse>( url, {
      email: email,
      password: password,
    } )
    .pipe(
      tap( resp => {
        return this.loginSuccess( resp );
        //  localStorage.setItem('token', resp.token);
      }),

        map( () => true ),

      catchError( ( error ) => {
        return this.authError( error );
      })

    )
    
    
    ;

  }





}
