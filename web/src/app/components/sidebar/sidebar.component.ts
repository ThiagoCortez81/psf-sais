import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';

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
    { path: '/historico/morador', title: 'Histórico do Morador', icon:'ni ni-collection text-green', class: ''},
    { path: '/historico/funcionario', title: 'Histórico do Funcionário', icon:'ni ni-collection text-green', class: ''},
    { path: '/visita', title: 'Visitas', icon: 'ni-shop text-green', class: ''},
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
  User = {
    ID_perfil: ''
  };

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.User = this.tokenStorageService.getUser();
    const ID_Perfil = this.User.ID_perfil;

    this.menuItems = ROUTES.filter(menuItem => {
      if(ID_Perfil == '1') return menuItem;
      if(ID_Perfil == '4') {
        if(menuItem.path != '/psf') return menuItem;
      } else {
        if(menuItem.path != '/psf' && menuItem.path != '/funcionario' && menuItem.path != '/historico/funcionario' && menuItem.path != '/historico/funcionario') return menuItem;
      }

    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
