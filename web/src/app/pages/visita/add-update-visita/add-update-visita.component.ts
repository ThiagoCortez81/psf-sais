import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { async } from '../../../../../../server/src/routes/bussiness/visita/visita.business';

@Component({
  selector: 'app-add-update-visita',
  templateUrl: './add-update-visita.component.html',
  styleUrls: ['./add-update-visita.component.css']
})
export class AddUpdateVisitaComponent implements OnInit {
  visitaObject = {
    ativo: 1,
    estado: '',
    dataAgendada: '',
    localizacao: '',
    tipo: '',
    ID_funcionario: 0
  };

  funcionarioArr = [];
  moradorArr = [];

  public posicao: any;

  // tslint:disable-next-line: max-line-length
  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id != null && id != '') {
      this.buscaVisita(id);
    }

    this.buscaFuncionario();
    this.buscaMorador();
  }


  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  async buscaVisita(id: string) {
    const listVisita = await this.ws.listVisita(id);
    if (listVisita && listVisita.data && listVisita.data.length > 0) {
      listVisita.data[0].dataAgendada = this.transformDate(listVisita.data[0].dataAgendada);
      this.visitaObject = listVisita.data[0];
    } else {
      this.toastr.error('Visita inválida', 'Ops!');
      this.router.navigate(['/visita']);
    }
  }

  async buscaFuncionario () {
    this.funcionarioArr = await this.ws.listFuncionario();
  }

  async buscaMorador() {
    this.moradorArr = await this.ws.listMorador();
  }

  async addVisita() {
    const visitaAddResponse = await this.ws.visitaAdd(this.visitaObject);
    if (visitaAddResponse != null) {
      if (visitaAddResponse['stats']) {
        this.toastr.success(visitaAddResponse['message'], 'Sucesso!');
        this.router.navigate(['/visita']);
      } else {
        this.toastr.error(visitaAddResponse['message'], 'Ops!');
      }
    } else {
      this.toastr.error('Tente novamente!', 'Ops!');
    }
  }

  async atualizarVisita() {
    const visitaAddResponse = await this.ws.visitaAtualizar(this.visitaObject);
    if (visitaAddResponse != null) {
      if (visitaAddResponse['stats']) {
        this.toastr.success(visitaAddResponse['message'], 'Sucesso!');
        this.router.navigate(['/visita']);
      } else {
        console.log('aqui');
        this.toastr.error(visitaAddResponse['message'], 'Ops!');
      }
    } else {
      this.toastr.error('Tente novamente!', 'Ops!');
    }
  }

  // public pegarLocalizacao() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       console.log(position);
  //     }, function(error) {
  //       console.log(error);
  //     });
  //   } else {
  //     alert('Ops, não foi possível acessar sua localização!');
  //   }
  // }
}


