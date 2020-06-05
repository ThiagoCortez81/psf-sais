import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
<<<<<<< HEAD
import { MoradorComponent } from './pages/morador/morador.component';
import { AddUpdateMoradorComponent } from './pages/Morador/add-update-morador/add-update-morador.component';
=======
import { PsfComponent } from './pages/psf/psf.component';
>>>>>>> origin


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
<<<<<<< HEAD
    MoradorComponent,
    AddUpdateMoradorComponent
=======
    PsfComponent
>>>>>>> origin
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
