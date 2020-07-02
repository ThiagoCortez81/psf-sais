import { Component, OnInit, ElementRef } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

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
    CorStatus: '',
    status
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
  controllerSrc: any = '';

  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private elementRef: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if (id != null && id != "") {
      this.buscaVisita(id);
      this.buscaFuncionariosVisita(id);
    }

  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }


  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  async buscaVisita(id: string) {
    let promise = new Promise(async (resolve, reject)=> {
      let visitaObject = await this.ws.listVisita(id);
      visitaObject = visitaObject.data.filter((element)=> {return element});
      visitaObject[0].dataAgendada = this.transformDate(visitaObject[0].dataAgendada);
      visitaObject[0].dataRealizada = this.transformDate(visitaObject[0].dataRealizada);

      Object.assign(this.visitaObject, visitaObject[0]);
      
      switch (this.visitaObject.status) {
          case 'Agendada': this.visitaObject.CorStatus = 'text-primary'; break;
          case 'Realizada': this.visitaObject.CorStatus = 'text-success'; break;
          case 'Cancelada': this.visitaObject.CorStatus = 'text-danger'; break;
      }

      // this.controllerSrc = this.getSafeUrl(`https://maps.google.com/maps?q=${this.visitaObject.localizacao}&hl=es;z=14&amp;output=embed`);
      // let observacao = document.getElementById('observacao');
      // observacao.style.height = (observacao.scrollHeight > observacao.clientHeight) ? (observacao.scrollHeight)+"px" : "60px";
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
    this.funcionarioArr = listFuncionario.data.filter(element => {
      return element.ativo == 1 && this.visitaObject.ID_funcionario.includes(element.ID_func);
    })
  }



}
