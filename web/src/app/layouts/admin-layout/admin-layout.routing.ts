import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { PsfComponent } from 'src/app/pages/psf/psf.component';
import { AddUpdatePsfComponent } from 'src/app/pages/psf/add-update-psf/add-update-psf.component';
import { VisitaComponent } from 'src/app/pages/visita/visita.component';
import { AddUpdateVisitaComponent } from 'src/app/pages/visita/add-update-visita/add-update-visita.component';
import { FuncionarioComponent } from 'src/app/pages//funcionario/funcionario.component';
import { AddUpdateFuncionarioComponent } from 'src/app/pages/funcionario/add-update-funcionario/add-update-funcionario.component';
import { MoradorComponent } from 'src/app/pages/morador/morador.component';
import { AddUpdateMoradorComponent } from 'src/app/pages/morador/add-update-morador/add-update-morador.component';
import { AuthGuardService } from 'src/app/services/authGuard/auth-guard.service';
import { AgendaComponent } from 'src/app/pages/agenda/agenda.component';
import { AgendaViewComponent } from 'src/app/pages/agenda/agenda-view/agenda-view.component';
import { RelatorioVisitasComponent } from 'src/app/pages/relatorio-visitas/relatorio-visitas.component';
import { RelatorioFuncionarioComponent } from 'src/app/pages/relatorio-funcionario/relatorio-funcionario.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'psf', component: PsfComponent },
    { path: 'psf/add', component: AddUpdatePsfComponent },
    { path: 'psf/edit/:id', component: AddUpdatePsfComponent },
    { path: 'funcionario', component: FuncionarioComponent },    
    { path: 'funcionario/add', component: AddUpdateFuncionarioComponent },
    { path: 'funcionario/edit/:id', component: AddUpdateFuncionarioComponent },
    { path: 'morador', component: MoradorComponent },
    { path: 'morador/add', component: AddUpdateMoradorComponent },
    { path: 'morador/edit/:id', component: AddUpdateMoradorComponent},

    { path: 'psf', component: PsfComponent, canActivate: [AuthGuardService] },
    { path: 'psf/add', component: AddUpdatePsfComponent, canActivate: [AuthGuardService] },
    { path: 'psf/edit/:id', component: AddUpdatePsfComponent, canActivate: [AuthGuardService] },
    { path: 'funcionario', component: FuncionarioComponent, canActivate: [AuthGuardService] },
    { path: 'funcionario/add', component: AddUpdateFuncionarioComponent, canActivate: [AuthGuardService] },
    { path: 'funcionario/edit/:id', component: AddUpdateFuncionarioComponent, canActivate: [AuthGuardService] },
    { path: 'visita', component: VisitaComponent, canActivate: [AuthGuardService] },
    { path: 'visita/add', component: AddUpdateVisitaComponent, canActivate: [AuthGuardService] },
    { path: 'visita/edit/:id', component: AddUpdateVisitaComponent, canActivate: [AuthGuardService] },
    { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuardService] },
    { path: 'agenda/view/:id', component: AgendaViewComponent, canActivate: [AuthGuardService] },
    { path: 'historico/morador', component: RelatorioVisitasComponent,canActivate:[AuthGuardService]},
    { path: 'historico/funcionario', component: RelatorioFuncionarioComponent,canActivate:[AuthGuardService]}

];
