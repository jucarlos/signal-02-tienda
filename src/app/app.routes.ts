import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from '@auth/guards/notAuthenticated.guard';

export const routes: Routes = [


    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canMatch: [
            notAuthenticatedGuard,

            // () => {

                
            //     return true;
            // }
         
        ]
    },
    {
        path: '',
        loadChildren: () => import('./front/store-front.routes')
    },
    {
        path: '**',
        redirectTo: ''
    }


];
