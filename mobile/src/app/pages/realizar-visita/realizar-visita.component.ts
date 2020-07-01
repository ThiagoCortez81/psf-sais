import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebserviceService } from 'src/app/services/webservice/webservice.service';
import { ToastController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-realizar-visita',
  templateUrl: './realizar-visita.component.html',
  styleUrls: ['./realizar-visita.component.scss'],
})
export class RealizarVisitaComponent implements OnInit {
  id: string;
  visita = {};

  constructor(private route: ActivatedRoute, private ws: WebserviceService, public toastr: ToastController, private router: Router, private geolocation: Geolocation) {
    this.id = this.route.snapshot.params.id;
  }

  async ngOnInit() {
    const visitaWS = await this.ws.listVisita(this.id)
    this.visita = visitaWS['data'][0];
    this.visita['endereco'] = `${this.visita['logradouro']}, ${this.visita['numero']}, ${this.visita['bairro']}, ${this.visita['cep']}, ${this.visita['cidade']} - ${this.visita['estado']}`;
    console.log(this.visita);
  }

  async efetuarVisita() {
    let toast;
    const visitaWS = this.visita;
    const now = new Date();
    // visitaWS[]
    visitaWS['necCurativo'] = (visitaWS['necCurativo'] ? 1 : 0);
    visitaWS['necEnfermeiro'] = (visitaWS['necEnfermeiro'] ? 1 : 0);
    visitaWS['necEspecialista'] = (visitaWS['necEspecialista'] ? 1 : 0);
    visitaWS['necInjetaveis'] = (visitaWS['necInjetaveis'] ? 1 : 0);
    visitaWS['usaFarmPopular'] = (visitaWS['usaFarmPopular'] ? 1 : 0);
    visitaWS['status'] = 'Realizada';
    visitaWS['dataAgendada'] = visitaWS['dataAgendada'].substr(0, 10);
    visitaWS['dataRealizada'] = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;

    const pos = await this.geolocation.getCurrentPosition({enableHighAccuracy: true});
    visitaWS['localizacao'] = `${pos.coords.latitude}, ${pos.coords.longitude}`;

    const visitaAddResponse = await this.ws.finalizaVisita(visitaWS);
    if (visitaAddResponse != null) {
      if (visitaAddResponse['stats']) {
        toast = await this.toastr.create({
          message: visitaAddResponse['message'],
          duration: 5000
        });
        this.router.navigate(['/agenda']);
      } else {
        toast = await this.toastr.create({
          message: visitaAddResponse['message'],
          duration: 5000
        });
      }
    } else {
      toast = await this.toastr.create({
        message: 'Tente novamente!',
        duration: 5000
      });
    }

    toast.present();
  }

  async moradorAusente() {
    let toast;

    if (this.visita['obs'] == null || this.visita['obs'] == "") {
      toast = await this.toastr.create({
        message: 'Adicione uma observação para continuar com a conclusão de morador ausente.',
        duration: 5000
      });

      toast.present();
      return;
    }

    const cancelaVisitaResponse = await this.ws.cancelaVisita(this.visita['ID_visita'], this.visita['obs']);
    if (cancelaVisitaResponse['stats'] == true) {
      toast = await this.toastr.create({
        message: `A visita foi cancelada com sucesso! <br>Motivo: <strong>${this.visita['obs']}</strong>`,
        duration: 5000
      });
      this.router.navigate(['/agenda']);
    } else {
      toast = await this.toastr.create({
        message: `A visita não foi cancelada! Tente novamente.`,
        duration: 5000
      });
    }

    toast.present();
  }

  // TODO: Adicionar ferramenta de geolocalização aqui

}
