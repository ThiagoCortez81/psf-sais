import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { PsfComponent } from 'src/app/pages/psf/psf.component';
import { AddUpdatePsfComponent } from 'src/app/pages/psf/add-update-psf/add-update-psf.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'psf', component: PsfComponent },
    { path: 'psf/add', component: AddUpdatePsfComponent },
    { path: 'psf/edit/:id', component: AddUpdatePsfComponent }
];
