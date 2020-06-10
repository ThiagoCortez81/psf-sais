// import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { WebserviceService } from 'src/app/services/webservice.service';

// import { ToastrService } from 'ngx-toastr';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class AddUpdatePsfComponent implements OnInit {
//   psfObject = {
//     ativo: 1,
//     estado: ''
//   };




// constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

// ngOnInit(): void {
//   let id = this.route.snapshot.params.id;
//   if (id != null && id != "") {
//     this.buscaMorador(id);
//   }
// }

// async buscaMorador(id: string) {
//   const listMorador = await this.ws.listMorador(id);
//   if (listMorador && listMorador.data && listMorador.data.length > 0) {
//     this.psfObject = listMorador.data[0];
//   } else {
//     this.toastr.error('Morador não existe', "Ops!");
//     this.router.navigate(['/psf']);
//   }
// }

// async addMorador() {
//   const moradorAddResponse = await this.ws.psfAdd(this.psfObject);
//   if (moradorAddResponse != null) {
//     if (moradorAddResponse['stats']) {
//       this.toastr.success(moradorAddResponse['message'], "Sucesso!");
//       this.router.navigate(['/psf']);
//     } else {
//       console.log('aqui');
//       this.toastr.error(moradorAddResponse['message'], "Ops!");
//     }
//   } else {
//     this.toastr.error("Tente novamente!", "Ops!");
//   }
// }

// async atualizarMorador() {
//   const moradorAddResponse = await this.ws.moradorAtualizar(this.psfObject);
//   if (moradorAddResponse != null) {
//     if (moradorAddResponse['stats']) {
//       this.toastr.success(moradorAddResponse['message'], "Sucesso!");
//       this.router.navigate(['/psf']);
//     } else {
//       console.log('aqui');
//       this.toastr.error(moradorAddResponse['message'], "Ops!");
//     }
//   } else {
//     this.toastr.error("Tente novamente!", "Ops!");
//   }
// }
// }





import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}