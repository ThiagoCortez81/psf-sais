import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-update-morador',
  templateUrl: './add-update-morador.component.html',
  styleUrls: ['./add-update-morador.component.css']
})
export class AddUpdateMoradorComponent implements OnInit {
  moradorObject = {
  ativo: 1,
  estado: '',
  dataNascimento: ''
};



  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id != null && id != "") {
      this.buscaMorador(id);
    }
  }
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  transformDate2(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  async buscaMorador(id: string) {
    const listMorador= await this.ws.listMorador(id);
    if (listMorador && listMorador.data && listMorador.data.length > 0) {
      
      listMorador.data[0].dataNascimento = this.transformDate(listMorador.data[0].dataNascimento);
      this.moradorObject = listMorador.data[0];
      console.log(listMorador.data[0].dataNascimento);
      
    } else {
      this.toastr.error('Morador inválido', "Ops!");
      this.router.navigate(['/morador']);
    }
  }
  
  async addMorador() {
    console.log('Meu morador'+ this.moradorObject.dataNascimento);

    const moradorAddResponse = await this.ws.moradorAdd(this.moradorObject);
    if (moradorAddResponse != null) {
      if (moradorAddResponse['stats']) {
        this.toastr.success(moradorAddResponse['message'], "Sucesso!");
        this.router.navigate(['/morador']);
      } else {
        this.toastr.error(moradorAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }

  async atualizarMorador() {
    console.log(this.moradorObject.dataNascimento);
   

    const moradorAddResponse = await this.ws.moradorAtualizar(this.moradorObject);
    
    if (moradorAddResponse != null) {
      if (moradorAddResponse['stats']) {
        this.toastr.success(moradorAddResponse['message'], "Sucesso!");
        this.router.navigate(['/morador']);
      } else {
        this.toastr.error(moradorAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }






}
