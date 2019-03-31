import { config } from './../shared/smartadmin.config';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './providers/auth.service';

@Injectable()
export class AuthResolver {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  resolve(): void {

    if(config.no_auth)
      return;

    if(AuthService.tokenValidated)
      return;

    if(this.authService.checkExpired()){
      this.router.navigate(['/auth/login']);
    }
    else if (this.authService.exixsToken()) {
      this.authService.verificarToken().subscribe(exist => {
        console.log("Verificada de token " + exist);
        if (exist < 0){
          this.router.navigate(['/auth/login']);
          localStorage.clear();
        }
        else{
          AuthService.tokenValidated = true;
        }
      });
    } else
      this.router.navigate(['/auth/login']);
  }
}