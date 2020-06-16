import { Injectable } from '@angular/core';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router) { }

  canActivate(): boolean {
    if (this.tokenService.getToken() == null || this.tokenService.getToken() == '') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
