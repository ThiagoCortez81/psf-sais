import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice/webservice.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  userData = {
    login: '',
    senha: ''
  };

  constructor(private ws: WebserviceService, public toastr: ToastController, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.loading = false;
  }

  async fazLogin() {
    this.loading = true;

    const loginResp = await this.ws.fazLogin(this.userData);
    if (loginResp['stats']) {
      this.toastr.create({
        message: loginResp['message'],
        duration: 2000
      });
      this.tokenStorage.saveToken(loginResp['token']);
      this.tokenStorage.saveUser(loginResp['dadosUsuario']);
      if (loginResp['dadosUsuario']['primeiroAcesso'] == 1) {
        this.router.navigate(['/primeiro-acesso']);
      } else {
        this.router.navigate(['/agenda']);
      }
    } else {
      this.toastr.create({
        message: loginResp['message'],
        duration: 2000
      });
    }

    this.loading = false;
  }

}
