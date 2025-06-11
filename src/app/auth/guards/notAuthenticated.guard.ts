import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';



export const notAuthenticatedGuard: CanMatchFn = async (route, segments) => {


  // No dejaré pasar si estás autenticado al auth/*
  console.log('Pasando por el guard');

  const authService = inject( AuthService );
  const router = inject( Router );

  // no debería funcionar.
  //const isAuthenticated = authService.checkStatus();

  // esto si
  const isAuthenticated: boolean = await firstValueFrom( authService.checkStatus() );

  if ( isAuthenticated ) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
  
};
