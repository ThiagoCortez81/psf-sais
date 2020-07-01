import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, ElementRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

const colors: any = {
  green: {
    primary: '#00e600',
    secondary: '#FAE3E3',
    status: 'Realizada',
    badge: 'badge badge-success',
  },
  red: {
    primary: '#ff132b',
    secondary: '#D1E8FF',
    status: 'Cancelada',
    badge: 'badge badge-danger',
  },
  yellow: {
    primary: '#f8de00',
    secondary: '#FDF1BA',
    status: 'Agendada',
    badge: 'badge badge-primary',
  },
};


@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = 'pt';
  refresh: Subject<any> = new Subject();
  modalOption: NgbModalOptions = {};
  events: CalendarEvent[] = [];
  eventsArr = [];
  dataAtual: string = '';
  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.listaVisitas();
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  // Evento ao clicar em um dia da agenda, abre o modal
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.eventsArr = events;
    this.dataAtual = this.transformDate(date);

    document.getElementById('openModal').click();
  }

  // Ao abrir o modal, carrega as visitas do dia
  open(content) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.ariaLabelledBy = 'modal-visitas';
    this.modalOption.size = 'lg';
    this.modal.open(content, this.modalOption).result.then((result) => {});
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // Carrega todas as visitas agendadas quando carrega a página
  async listaVisitas() {
    const visitas = await this.ws.listVisita();
   
    let events: Array<CalendarEvent> = [];
    let color: any;
    let corStatus: string;

   visitas.data.forEach(visita => {

      switch (visita.status){
          case 'Agendada': color = colors.yellow; break;
          case 'Realizada': color = colors.green; break;
          case 'Cancelada': color = colors.red; break;
      }

      events.push({
        start: new Date(visita.dataAgendada),
        title: visita.nome,
        color:  color,
        // actions: this.actions,
        id: visita.ID_visita
      });

   });

    this.events = events;
    this.refresh.next();
  }

  // Ao clicar na ação de desativar a visita
  public async desativar(id: number) {

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
            this.cancelaVisita(id, result.value.toString());
          }
        })
      }
    })
  }

  async cancelaVisita(id: any, obs: string) {
    const cancelaVisitaResponse = await this.ws.cancelaVisita(id, obs);
    if (cancelaVisitaResponse['stats'] == true) {
      this.ngOnInit();
      swal.fire('Sucesso!', `A visita foi cancelada com sucesso! <br>Motivo: <strong>${obs}</strong>`, 'success');
    } else {
      swal.fire('Erro!', `A visita não foi cancelada! Tente novamente.`, 'error');
    }
    document.getElementById('closeModal').click();
  }

  async editar(id: number) {
    document.getElementById('closeModal').click();
    this.router.navigate(['visita/edit/', id]);
  }

  visualizar(id: number) {
    document.getElementById('closeModal').click();
    this.router.navigate(['agenda/view/', id]);
  }
  
}