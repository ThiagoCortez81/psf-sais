import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

    { path: '/psf', title: 'PSFs',  icon:'ni-ambulance text-green', class: '' },
    { path: '/morador', title: 'Morador',  icon:'ni-circle-08 text-green', class: '' },
    { path: '/funcionario', title: 'Funcionários',  icon:'ni-single-02 text-green', class: '' },
    { path: '/visita', title: 'Visitas', icon: 'ni-shop text-green', class: ''},
    { path: '/historico/morador', title: 'Histórico do Morador', icon:'ni ni-collection text-green', class: ''},
    { path: '/historico/funcionario', title: 'Histórico do Funcionário', icon:'ni ni-collection text-green', class: ''},
    { path: '/agenda', title: 'Agenda', icon: 'ni-calendar-grid-58 text-green', class: ''}

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
