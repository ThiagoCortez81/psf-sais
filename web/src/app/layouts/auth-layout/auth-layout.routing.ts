import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { PrimeiroAcessoComponent } from 'src/app/pages/primeiro-acesso/primeiro-acesso.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'primeiro-acesso', component: PrimeiroAcessoComponent },
    { path: 'register',       component: RegisterComponent }
];
