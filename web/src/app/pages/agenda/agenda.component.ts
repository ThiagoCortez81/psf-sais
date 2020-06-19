import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, ElementRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  },
  red: {
    primary: '#ff132b',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#f8de00',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = 'pt';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt text-blue"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editar(event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt text-danger"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.desativar(event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: addDays(startOfDay(new Date()), 2),
  //     title: 'João da Silva',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'Melise Paula',
  //     color: colors.green,
  //     actions: this.actions,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'Rafael Frinhani',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  // ];

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.listaVisitas();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    console.log(event.id, 'clicou')
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.green,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    console.log(eventToDelete);
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  async listaVisitas() {
    const visitas = await this.ws.listVisita();
   
    let events: Array<CalendarEvent> = [];
    let color: any;

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
        actions: this.actions,
        id: visita.ID_visita
      });

   });

    this.events = events;
    this.refresh.next();
  }

  public async desativar(event: CalendarEvent) {

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
            this.cancelaVisita(event.id, result.value.toString());
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
  }

  async editar(event: CalendarEvent) {
    const id = event.id;

    this.router.navigate(['visita/edit/', id]);
    // swal.fire('Funcionário Incluído Com Sucesso!', `Deu certo o Editar!`, 'success');
  }
  
}