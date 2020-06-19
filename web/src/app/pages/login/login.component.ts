import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginInfo = {
    login: '',
    senha: ''
  }
  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  async fazLogin() {
    const loginResp = await this.ws.fazLogin(this.loginInfo);
    if (loginResp['stats']) {
      this.toastr.success(loginResp['message'], "Sucesso!");
      this.tokenStorage.saveToken(loginResp['token']);
      this.tokenStorage.saveUser(loginResp['dadosUsuario']);
      if (loginResp['dadosUsuario']['primeiroAcesso'] == 1) {
        this.router.navigate(['/primeiro-acesso']);
      } else {
        if (loginResp['dadosUsuario']['id_perfil'] == 1 || loginResp['dadosUsuario']['id_perfil'] == 9) {
          this.router.navigate(['/psf']);
        } else {
          this.router.navigate(['/moradores']);
        }
      }
    } else {
      this.toastr.error(loginResp['message'], "Ops!");
    }
  }

  ngOnDestroy() {
  }

}