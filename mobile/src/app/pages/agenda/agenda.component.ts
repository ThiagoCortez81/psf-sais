import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice/webservice.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  listAtendimentos = [];
  dateNow = new Date();
  source = interval(10000);
  subscription: Subscription;

  constructor(private ws: WebserviceService, private router: Router) { }

  async ngOnInit() {
    this.listAtendimentos = await this.ws.listFuncMorador();
    this.subscription = this.source.subscribe(val => this.ionViewWillEnter());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async ionViewWillEnter() {
    this.listAtendimentos = await this.ws.listFuncMorador();
  }

  realizaVisita(atendimento) {
    this.router.navigate(['/visita', atendimento['ID_visita']]);
  }

  openGoogleMaps(atendimento) {
    const address = encodeURIComponent(`${atendimento['logradouro']}, ${atendimento['numero']}, ${atendimento['bairro']}, ${atendimento['cep']}, ${atendimento['cidade']} - ${atendimento['estado']}`);
    console.log(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_system');
  }
}
