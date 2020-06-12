import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';

import { Router } from '@angular/router';

declare var $: any;



@Component({
  selector: 'app-morador',
  templateUrl: './morador.component.html',
  styleUrls: ['./morador.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MoradorComponent implements OnInit {
  @ViewChild('dataTable', {static: true }) table: ElementRef;
  dataTable: any;
 // listPsf: [];

  constructor(private ws: WebserviceService, private elementRef: ElementRef, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      destroy: true,
      processing: true,
      ajax: {
        url: "http://localhost:5000/api/morador/list",
        type: "GET"
      },
      language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Nenhum registro encontrado",
        info: "Página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhum registro encontrado",
        infoFiltered: "(filtrado de _MAX_ resultados)",
        paginate: {
          previous: "<",
          next: ">"
        }
      },
      buttons: ['copy', 'excel', 'pdf', 'colvis'],
      columns: [
        { name: "Nome do morador", data: 'nome', orderable: true },
        { name: "Endereço", data: 'logradouro', orderable: true },
        {
          name: "Ativo", data: (row) => {
            if (row.ativo) {
              return '<span class="badge badge-success">ATIVO</span>';
            }

            return '<span class="badge badge-danger">DESATIVADO</span>';
          },
          orderable: false
        },
        {
          name: "Ações", data: (row) => {
            return `
              <button type="button" class="btn btn-sm btn-success edita-btn" value="${row.ID_morador}">Editar</button>
              <button type="button" class="btn btn-sm btn-danger desativa-btn" value="${row.ID_morador}">Desativar</button>
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

  public async desativar(ref: MouseEvent) {
    const id = ref.srcElement['value'];
    const moradorDeleteResponse = await this.ws.moradorDelete(id);
    
    if (moradorDeleteResponse != null) {
      if (moradorDeleteResponse['stats']) {
        this.toastr.success(moradorDeleteResponse['message'], "Sucesso!");
        // buscando dados
        this.ngOnInit();
      } else {
        this.toastr.error(moradorDeleteResponse['message'], "Ops!");
      }
    } else {
    this.toastr.error("Tente novamente!", "Ops!");
    }
  }

  public async editar(ref: MouseEvent) {
    const id = ref.srcElement['value'];
    
    this.router.navigate(['morador/edit/', id])
  }

  }


