import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-psf',
  templateUrl: './add-update-psf.component.html',
  styleUrls: ['./add-update-psf.component.css']
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

  async buscaPSF(id: string) {
    const listPSF = await this.ws.listPSF(id);
    if (listPSF && listPSF.data && listPSF.data.length > 0) {
      this.psfObject = listPSF.data[0];
    } else {
      this.toastr.error('PSF inválido', "Ops!");
      this.router.navigate(['/psf']);
    }
  }

  async addPSF() {
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

  async atualizarPSF() {
    const psfAddResponse = await this.ws.psfAtualizar(this.psfObject);
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

}
