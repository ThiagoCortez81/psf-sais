import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-psf',
  templateUrl: './psf.component.html',
  styleUrls: ['./psf.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PsfComponent implements OnInit {
  @ViewChild('dataTable', { static: true }) table: ElementRef;
  dataTable: any;

  constructor() { }

  ngOnInit() {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
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
      buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
      columns: [
        {name: "Nome do PSF", orderable: true},
        {name: "Endereço", orderable: true},
        {name: "Ativo", orderable: false},
        {name: "Ações", orderable: false}
        ]
    });
  }
}
