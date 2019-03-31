import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../providers/auth.service';
import { AlertasService } from '../../providers/alertas.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  public error: string;
  public error_desc: string;

  constructor(private authService: AuthService,
    private alertasService: AlertasService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.queryParams
      .subscribe(params => {
        this.error = params['error'] || "Error desconocido.";
        this.error_desc = params['error'];
      });
  }

  doLogout() {
    this.authService.doLogout();
  }

  doLogoutFull() {
    this.authService.doLogoutFull();
  }

}
