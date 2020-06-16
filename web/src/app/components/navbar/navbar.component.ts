import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public userName: string = '';
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router, private tokenService: TokenStorageService) {
    this.location = location;
  }

  ngOnInit() {
    const user = this.tokenService.getUser();

    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.userName = user['nome'];
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return '';
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }

}
