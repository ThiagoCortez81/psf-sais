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
    let toast;
    this.loading = true;

    const loginResp = await this.ws.fazLogin(this.userData);
    if (loginResp['stats']) {
      toast = await this.toastr.create({
        message: loginResp['message'],
        duration: 2000
      });
      this.tokenStorage.saveToken(loginResp['token']);
      this.tokenStorage.saveUser(loginResp['dadosUsuario']);
      if (loginResp['dadosUsuario']['primeiroAcesso'] == 1) {
        await this.router.navigate(['/primeiro-acesso']);
      } else {
        await this.router.navigate(['/agenda']);
      }
    } else {
      toast = await this.toastr.create({
        message: loginResp['message'],
        duration: 2000
      });
    }
    toast.present();

    this.loading = false;
  }

}
