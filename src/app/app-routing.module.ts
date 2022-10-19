import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sign-up', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: '/all-cryptos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
