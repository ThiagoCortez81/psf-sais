import { Component, OnInit, ElementRef } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agenda-view',
  templateUrl: './agenda-view.component.html',
  styleUrls: ['./agenda-view.component.css']
})
export class AgendaViewComponent implements OnInit {

  visitaObject = {
    ativo: 1,
    estado: '',
    dataAgendada: '',
    localizacao: '',
    tipo: '',
    ID_funcionario: [],
    ID_morador: '',
  };

  moradorObject = {
    nome: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    telefone: '',
  };

  funcionarioArr = [];

  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private elementRef: ElementRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if (id != null && id != "") {
      this.buscaVisita(id);
      this.buscaFuncionariosVisita(id);
    }

  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  async buscaVisita(id: string) {
    let promise = new Promise(async (resolve, reject)=> {
      let visitaObject = await this.ws.listVisita(id);
      visitaObject = visitaObject.data.filter((element)=> {return element});
      visitaObject[0].dataAgendada = this.transformDate(visitaObject[0].dataAgendada);

      Object.assign(this.visitaObject, visitaObject[0]);
      resolve(this.visitaObject);
    });

    promise.then(() =>{
      this.buscaMorador(this.visitaObject.ID_morador);
    })
  }

  async buscaMorador(id: string) {
    let moradorObject = await this.ws.listMorador(id);
    moradorObject = moradorObject.data.filter(element => {return element});
    
    Object.assign(this.moradorObject, moradorObject[0]);
  }

  async buscaFuncionariosVisita (id: string) {
    let promise = new Promise(async (resolve, reject) => {
      let listFuncionario = await this.ws.listVisitaFunc(id);
      listFuncionario = listFuncionario.data.filter(element => {return element});
      
      this.visitaObject.ID_funcionario = [];
      resolve(listFuncionario.forEach(element => {
        this.visitaObject.ID_funcionario.push(element.ID_func);
      }));

    });

    promise.then(()=> {
        this.buscaFuncionarios();
    });
  }

  async buscaFuncionarios () {
    let listFuncionario = await this.ws.listFuncionario();
    console.log(this.visitaObject.ID_funcionario);
    this.funcionarioArr = listFuncionario.data.filter(element => {
      return element.ativo == 1 && this.visitaObject.ID_funcionario.includes(element.ID_func);
    })
  }

}
