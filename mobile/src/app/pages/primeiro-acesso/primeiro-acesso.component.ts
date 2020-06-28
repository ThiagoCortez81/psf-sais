import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { WebserviceService } from 'src/app/services/webservice/webservice.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.scss'],
})
export class PrimeiroAcessoComponent implements OnInit {
  userData = {
    senha: '',
    confirmarSenha: ''
  };
  constructor(private ws: WebserviceService, private toastr: ToastController, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {  }

  async alterarSenha() {
    const alteraSenhaResp = await this.ws.alteraSenhaPrimeiroAcesso(this.userData);

    if (alteraSenhaResp['stats']) {
      this.toastr.create({
        message: alteraSenhaResp['message'],
        duration: 2000
      });
      const loggedUser = this.tokenStorage.getUser();
      loggedUser['primeiroAcesso'] = 0;
      this.tokenStorage.saveUser(loggedUser);
      
      this.router.navigate(['/agenda']);
    } else {
      this.toastr.create({
        message: alteraSenhaResp['message'],
        duration: 2000
      });
    }
  }

}
