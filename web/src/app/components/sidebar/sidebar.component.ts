import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    // { path: '/psf', title: 'PSFs',  icon:'ni-ambulance text-black', class: '' },
    { path: '/morador', title: 'Morador',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/psf', title: 'PSFs',  icon:'ni-ambulance text-blue', class: '' },
    { path: '/funcionario', title: 'Funcionários',  icon:'ni-single-02 text-blue', class: '' },   
    { path: '/agenda', title: 'Agenda', icon: 'ni-calendar-grid-58 text-blue', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
