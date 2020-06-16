import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-update-funcionario',
  templateUrl: './add-update-funcionario.component.html',
  styleUrls: ['./add-update-funcionario.component.css']
})
export class AddUpdateFuncionarioComponent implements OnInit {
  funcionarioObject = {
    ativo: 1,
    estado: '',
    dataNascimento: ''
  };

  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id != null && id != "") {
      this.buscaFuncionario(id);
    }
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  transformDate2(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  async buscaFuncionario(id: string) {
    const listFuncionario = await this.ws.listFuncionario(id);

    if (listFuncionario && listFuncionario.data && listFuncionario.data.length > 0) {

      listFuncionario.data[0].dataNascimento = this.transformDate(listFuncionario.data[0].dataNascimento);

      this.funcionarioObject = listFuncionario.data[0];

    } else {
      this.toastr.error('Funcionário inválido', "Ops!");
      this.router.navigate(['/funcionario']);
    }
  }

  async addFuncionario() {

    const funcionarioAddResponse = await this.ws.funcionarioAdd(this.funcionarioObject);
    if (funcionarioAddResponse != null) {
      if (funcionarioAddResponse['stats']) {
        this.toastr.success(funcionarioAddResponse['message'], "Sucesso!");
        this.router.navigate(['/funcionario']);
      } else {
        this.toastr.error(funcionarioAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }

  async atualizarFuncionario() {

    const funcionarioAddResponse = await this.ws.funcionarioAtualizar(this.funcionarioObject);

    if (funcionarioAddResponse != null) {
      if (funcionarioAddResponse['stats']) {
        this.toastr.success(funcionarioAddResponse['message'], "Sucesso!");
        this.router.navigate(['/funcionario']);
      } else {
        this.toastr.error(funcionarioAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }

}
