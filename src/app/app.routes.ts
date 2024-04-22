import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';

export const routes: Routes = [
    { path: '', component: ContactListComponent, canActivate: [AuthGuard]},
    { path: 'form', component: ContactFormComponent, canActivate: [AuthGuard]},
    { path: 'form/:id', component: ContactFormComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent}
];
