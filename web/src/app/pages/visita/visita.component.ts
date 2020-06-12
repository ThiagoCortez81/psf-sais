
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { WebserviceService } from '../../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css'],
})

export class VisitaComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table: ElementRef;
  dataTable: any;
  listVisita: [];

  constructor(private ws: WebserviceService, private elementRef: ElementRef, private toastr: ToastrService, private router: Router) { }

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
        { name: 'Data e hora', data: 'timestamp', orderable: true },
        { name: 'Data de retorno', data: 'dataRetorno', orderable: true },
        { name: 'Tipo da visita', data: 'tipoVisita', orderable: true },
        { name: 'Necessita de injetáveis?', data: 'necInjetaveis', orderable: true },
        { name: 'Necessita de especialista?', data: 'necEspecialista', orderable: true },
        { name: 'Necessita de enfermeiro?', data: 'necEnfermeiro', orderable: true },
        { name: 'Necessita de curativo?', data: 'necCurativo', orderable: true },
        { name: 'Utiliza Farmácia Popular?', data: 'utilFarmPopular', orderable: true },
        { name: 'Morador não encontrado?', data: 'morNaoEncontrado', orderable: true },
        { name: 'Observações', data: 'obs', orderable: true },
        { name: 'Localização', data: 'local', orderable: true },
        {
          name: 'Ações', data: (row) => {
            return `
              <button type="button" class="btn btn-sm btn-success edita-btn" value="${row.ID_VISITA}">Editar</button>
              <button type="button" class="btn btn-sm btn-danger desativa-btn" value="${row.ID_VISITA}">Desativar</button>
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
            //elem.addEventListener('click', this.desativar.bind(this));
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
/*
    public async desativar(ref: MouseEvent) {
      const id = ref.srcElement['value'];
      const visitaDeleteResponse = await this.ws.visitaDelete(id);

      if (visitaDeleteResponse != null) {
        if (visitaDeleteResponse['stats']) {
          this.toastr.success(visitaDeleteResponse['message'], 'Sucesso!');
          // buscando dados
          this.ngOnInit();
        } else {
          console.log('aqui');
          this.toastr.error(visitaDeleteResponse['message'], 'Ops!');
        }
      } else {
      this.toastr.error('Tente novamente!', 'Ops!');
      }
    }
*/
    public async editar(ref: MouseEvent) {
      const id = ref.srcElement['value'];

      this.router.navigate(['visita/edit/', id])
    }
}
