import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthResponse } from '@auth/interfaces/auth-response';
import { User } from '@auth/interfaces/user.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


type AuthStatus = 'checking' | 'authenticated' | 'non-authenticated';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject( HttpClient );

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>( null );

  saveToLocalStorage = effect( () => {
    console.log('Pasando por el efecto');
    localStorage.setItem('token', this._token() ?? '')
  })


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





  login( email: string, password: string ): Observable<boolean> {

    const url = `${environment.baseUrl}/auth/login`;

    return this.http.post<AuthResponse>( url, {
      email: email,
      password: password,
    } )
    .pipe(
      tap( resp => {
        this._authStatus.set('authenticated');
        this._user.set(resp.user);
        this._token.set( resp.token );

        //  localStorage.setItem('token', resp.token);

      }),

      map( () => true )

    )
    
    
    ;

  }





}
