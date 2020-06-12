import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { log } from 'console';

@Component({
  selector: 'app-add-update-visita',
  templateUrl: './add-update-visita.component.html',
  styleUrls: ['./add-update-visita.component.css']
})
export class AddUpdateVisitaComponent implements OnInit {
  visitaObject = {
    ativo: 1,
    estado: ''
  };

  public posicao: any;

  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id != null && id != '') {
      this.buscaVisita(id);
    }
  }

  async buscaVisita(id: string) {
    const listVisita = await this.ws.listVisita(id);
    if (listVisita && listVisita.data && listVisita.data.lenght > 0) {
      this.visitaObject = listVisita[0];
    } else {
      this.toastr.error('Visita inválida', 'Ops!');
      this.router.navigate(['/visita']);
    }
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

  public pegarLocalizacao() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
      }, function(error) {
        console.log(error);
      });
    } else {
      alert('Ops, não foi possível acessar sua localização!');
    }
  }
}


