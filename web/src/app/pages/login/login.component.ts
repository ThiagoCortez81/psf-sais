import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AddUpdatePsfComponent implements OnInit {
  psfObject = {
    ativo: 1,
    estado: ''
  };




constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

ngOnInit(): void {
  let id = this.route.snapshot.params.id;
  if (id != null && id != "") {
    this.buscaPSF(id);
  }
}

async buscaMorador(id: string) {
  const listPSF = await this.ws.listPSF(id);
  if (listPSF && listPSF.data && listPSF.data.length > 0) {
    this.psfObject = listPSF.data[0];
  } else {
    this.toastr.error('Morador não existe', "Ops!");
    this.router.navigate(['/psf']);
  }
}

async addMorador() {
  const psfAddResponse = await this.ws.psfAdd(this.psfObject);
  if (psfAddResponse != null) {
    if (psfAddResponse['stats']) {
      this.toastr.success(psfAddResponse['message'], "Sucesso!");
      this.router.navigate(['/psf']);
    } else {
      console.log('aqui');
      this.toastr.error(psfAddResponse['message'], "Ops!");
    }
  } else {
    this.toastr.error("Tente novamente!", "Ops!");
  }
}

async atualizarMorador() {
  const psfAddResponse = await this.ws.moradorAtualizar(this.psfObject);
  if (psfAddResponse != null) {
    if (psfAddResponse['stats']) {
      this.toastr.success(psfAddResponse['message'], "Sucesso!");
      this.router.navigate(['/psf']);
    } else {
      console.log('aqui');
      this.toastr.error(psfAddResponse['message'], "Ops!");
    }
  } else {
    this.toastr.error("Tente novamente!", "Ops!");
  }
}

