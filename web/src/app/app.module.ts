import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MoradorComponent } from './pages/morador/morador.component';

import { PsfComponent } from './pages/psf/psf.component';
import { AddUpdatePsfComponent } from './pages/psf/add-update-psf/add-update-psf.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { AddUpdateFuncionarioComponent } from './pages/funcionario/add-update-funcionario/add-update-funcionario.component';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    MoradorComponent,
    PsfComponent,
    PsfComponent,
    AddUpdatePsfComponent,
    FuncionarioComponent,
    AddUpdateFuncionarioComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
