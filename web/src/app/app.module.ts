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
import { VisitaComponent } from './pages/visita/visita.component';
import { AddUpdatePsfComponent } from './pages/psf/add-update-psf/add-update-psf.component';
import { AddUpdateVisitaComponent } from './pages/visita/add-update-visita/add-update-visita.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { AddUpdateFuncionarioComponent } from './pages/funcionario/add-update-funcionario/add-update-funcionario.component';
import { DatePipe } from '@angular/common';
import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { AddUpdateMoradorComponent } from './pages/morador/add-update-morador/add-update-morador.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AgendaViewComponent } from './pages/agenda/agenda-view/agenda-view.component';
import { RelatorioVisitasComponent } from './pages/relatorio-visitas/relatorio-visitas.component';
import { RelatorioFuncionarioComponent } from './pages/relatorio-funcionario/relatorio-funcionario.component';

registerLocaleData(localePt);

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

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
    ToastrModule.forRoot(), // ToastrModule added
    NgSelectModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }) // Added Select Module
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    MoradorComponent,
    PsfComponent,
    VisitaComponent,
    AddUpdatePsfComponent,
    AddUpdateVisitaComponent,
    FuncionarioComponent,
    AddUpdateFuncionarioComponent,
    PrimeiroAcessoComponent,
    AddUpdateMoradorComponent,
    AgendaComponent,
    AgendaViewComponent,
    RelatorioVisitasComponent,
    RelatorioFuncionarioComponent,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]

})
export class AppModule { }

