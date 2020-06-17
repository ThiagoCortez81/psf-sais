import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {
  loginInfo = {
    senha: '',
    confirmarSenha: ''
  };
  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  async alterarSenha() {
    const alteraSenhaResp = await this.ws.alteraSenhaPrimeiroAcesso(this.loginInfo);

    if (alteraSenhaResp['stats']) {
      this.toastr.success(alteraSenhaResp['message'], "Sucesso!");
      const loggedUser = this.tokenStorage.getUser();
      loggedUser['primeiroAcesso'] = 0;
      this.tokenStorage.saveUser(loggedUser);
      
      if (loggedUser == 1 || loggedUser == 9) {
        this.router.navigate(['/psf']);
      } else {
        this.router.navigate(['/moradores']);
      }
    } else {
      this.toastr.error(alteraSenhaResp['message'], "Ops!");
    }
  }

}
