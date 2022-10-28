import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'all-cryptos',
    loadChildren: () =>
      import('./components/cryptos/cryptos.module').then(
        (m) => m.CryptosModule
      ),
  },
  { path: 'sign-up', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: '/all-cryptos' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
