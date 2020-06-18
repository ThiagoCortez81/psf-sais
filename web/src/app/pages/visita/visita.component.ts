import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { WebserviceService } from '../../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { AddUpdateVisitaComponent } from './add-update-visita/add-update-visita.component';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css'],
})

export class VisitaComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table: ElementRef;
  dataTable: any;
  listVisita: [];

  constructor(private ws: WebserviceService, private elementRef: ElementRef, private toastr: ToastrService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      destroy: true,
      processing: true,
      ajax: {
        url: 'http://localhost:5000/api/visita/list',
        type: 'GET'
      },
      language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'Nenhum registro encontrado',
        info: 'Página _PAGE_ de _PAGES_',
        infoEmpty: 'Nenhum registro encontrado',
        infoFiltered: '(filtrado de _MAX_ resultados)',
        paginate: {
          previous: '<',
          next: '>'
        }
      },
      buttons: ['copy', 'excel', 'pdf', 'colvis'],
      columns: [
        // { name: 'ID da visita', data: 'id', orderable: true },
        { name: 'Nome morador', data: 'nome', orderable: true },
        { name: 'Data agendada', data: 'dataAgendada', orderable: true },
        // { name: 'Data de retorno', data: 'dataRetorno', orderable: true },
        { name: 'Tipo da visita', data: 'tipo', orderable: true },
        // { name: 'Necessita de injetáveis?', data: 'necInjetaveis', orderable: true },
        // { name: 'Necessita de especialista?', data: 'necEspecialista', orderable: true },
        // { name: 'Necessita de enfermeiro?', data: 'necEnfermeiro', orderable: true },
        //{ name: 'Necessita de curativo?', data: 'necCurativo', orderable: true },
        // { name: 'Utiliza Farmácia Popular?', data: 'utilFarmPopular', orderable: true },
        { name: 'Status', data: 'status', orderable: true },
        //  { name: 'Observações', data: 'obs', orderable: true },
        // { name: 'Localização', data: 'local', orderable: true },
        {
          name: 'Ações', data: (row) => {
            return `
              <button type="button" class="btn btn-sm btn-success edita-btn" value="${row.ID_visita}">Editar</button>
              <button type="button" class="btn btn-sm btn-danger desativa-btn" value="${row.ID_visita}">Cancelar</button>
            `;
          },
          orderable: false
        },
      ],
    });

    setInterval((that) => {
      if (that.elementRef.nativeElement.querySelector('.desativa-btn')) {
        const elems = that.elementRef.nativeElement.querySelectorAll('.desativa-btn');
        for (let elem of elems) {
          if (elem.getAttribute('listener') !== 'true') {
            elem.setAttribute('listener', 'true');
            elem.addEventListener('click', this.desativar.bind(this));
          }
        };
      }
      if (that.elementRef.nativeElement.querySelector('.edita-btn')) {
        const elems = that.elementRef.nativeElement.querySelectorAll('.edita-btn');
        for (let elem of elems) {
          if (elem.getAttribute('listener') !== 'true') {
            elem.setAttribute('listener', 'true');
            elem.addEventListener('click', this.editar.bind(this));
          }
        };
      }
    }, 1000, this);
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public async desativar(ref: MouseEvent) {

    swal.fire({
      title: 'Você tem certeza?',
      text: 'A visita não poderá ser realizada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero cancelar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire({
          title: 'Explique a razão do cancelamento da visita',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.cancelaVisita(ref.srcElement['value'], result.value.toString());
          }
        })
      }
    })
  }

  public async editar(ref: MouseEvent) {
    const id = ref.srcElement['value'];

    this.router.navigate(['visita/edit/', id]);
    // swal.fire('Funcionário Incluído Com Sucesso!', `Deu certo o Editar!`, 'success');
  }

  async cancelaVisita(id: string, obs: string) {
    const cancelaVisitaResponse = await this.ws.cancelaVisita(id, obs);
    if (cancelaVisitaResponse['stats'] == true) {
      this.ngOnInit();
      swal.fire('Sucesso!', `A visita foi cancelada com sucesso! <br>Motivo: <strong>${obs}</strong>`, 'success');
    } else {
      swal.fire('Erro!', `A visita não foi cancelada! Tente novamente.`, 'error');
    }
  }


}
