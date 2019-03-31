import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";

export const routes:Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:access_token/:refresh_token/:expires_in/:scope',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  }


  /*,
  {
    path: 'forgot-password',
    component: ForgotComponent
  },
  {
    path: 'locked',
    component: LockedComponent
  }*/
];

export const routing = RouterModule.forChild(routes);
