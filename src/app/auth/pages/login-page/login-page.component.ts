import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-login-page',
  imports: [ ReactiveFormsModule, AlertComponent  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

 router = inject( Router );
 fb = inject( FormBuilder );
 authService = inject( AuthService );

 hasError = signal(false);



 loginForm = this.fb.group({
  email: [ '' , [Validators.required, Validators.email ] ,    ],
  password: [ '', [ Validators.required, Validators.minLength(6)] , ]
 } );



 onSubmit() {

      if ( this.loginForm.invalid ) {
        console.log('El formulario es inválido');

        this.hasError.set( true );
        setTimeout(() => {
          this.hasError.set ( false );
        }, 3000);

        return;
      }

      const { email = '', password = '' } = this.loginForm.value;


      // petición http
      this.authService.login( email!, password! )
        .subscribe( isAuthenticated => {

          if ( isAuthenticated ) {
            this.router.navigateByUrl('/')
            return;
          }

          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set( false );
          }, 3000);

      })





 }
  


}
