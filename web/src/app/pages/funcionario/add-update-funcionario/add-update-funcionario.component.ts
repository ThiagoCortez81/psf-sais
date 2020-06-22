import { Component, OnInit, ElementRef } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-update-funcionario',
  templateUrl: './add-update-funcionario.component.html',
  styleUrls: ['./add-update-funcionario.component.css']
})
export class AddUpdateFuncionarioComponent implements OnInit {
  funcionarioObject = {
    ID_func: '',
    ID_perfil: '',
    nome: '',
    cpf: '',
    sexo: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    ativo: 1,
    login: '',
    senha: '',
    dataNascimento: '',
    ID_PSF: []
  };

  perfilArr = [];
  estadosArr = [];
  municipiosArr = [];
  psfArr = [];
  usuariosArr = [];
  msgValidacaoUsuario = '';
  ID_Funcionario = '';

  constructor(private ws: WebserviceService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private elementRef: ElementRef) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id != null && id != "") {
      this.buscaFuncionario(id);
      this.ID_Funcionario = id;
      this.listFuncPSF(id);
    }
    this.buscaPerfil();
    this.buscaEstados();
    this.buscaMunicipios();
    this.validaUsuario();
    this.buscaUsuarios();
    this.buscaPSF();
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  transformDate2(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  async buscaFuncionario(id: string) {
    const listFuncionario = await this.ws.listFuncionario(id);

    if (listFuncionario && listFuncionario.data && listFuncionario.data.length > 0) {

      listFuncionario.data[0].dataNascimento = this.transformDate(listFuncionario.data[0].dataNascimento);

      this.funcionarioObject = listFuncionario.data[0];

    } else {
      this.toastr.error('Funcionário inválido', "Ops!");
      this.router.navigate(['/funcionario']);
    }
  }

  async listFuncPSF (id: string) {
    let listFuncPSF = await this.ws.listFuncPSF(id);
    listFuncPSF = listFuncPSF.data.filter(element => {return element.ativo == 1});
    
    this.funcionarioObject.ID_PSF = [];
    listFuncPSF.forEach(element => {
      this.funcionarioObject.ID_PSF.push(element.ID_PSF);
    });
  }

  async buscaUsuarios() {
    const listFuncionario = await this.ws.listFuncionario();
    this.usuariosArr = listFuncionario.data;
  }

  async buscaPerfil() {
    this.perfilArr = await this.ws.listPerfil();
  }

  async buscaPSF() {
    const listPSF = await this.ws.listPSF();
    this.psfArr = listPSF.data.filter(element => {return element.ativo == 1});
  }

  async buscaEstados() {
    this.estadosArr = await this.ws.listEstados();

    const estado = this.elementRef.nativeElement.querySelector('#input_estado');
    setTimeout(() => {
      if (estado.selectedIndex != -1) {
        const event = new Event('change');
        estado.dispatchEvent(event);
      }
    }, 1000);

  }

  async buscaMunicipios() {
    const estado = this.elementRef.nativeElement.querySelector('#input_estado');
    
    estado.addEventListener('change', async () => {
      const idEstado = estado.options[estado.selectedIndex].id;
      this.municipiosArr = await this.ws.listMunicipios(idEstado);
    });


  }

  async addFuncionario() {
    const password = await this.generatePassword();
    this.funcionarioObject.senha = password;

    const input = this.elementRef.nativeElement.querySelector('#input_usuario');

    if (input.classList.contains('invalid')) {
      this.toastr.error("Tente novamente!", "O Usuário especificado já está sendo utilizado!");
      return
    }
    const funcionarioAddResponse = await this.ws.funcionarioAdd(this.funcionarioObject);
    if (funcionarioAddResponse != null) {
      if (funcionarioAddResponse['stats']) {
        swal.fire('Funcionário Incluído Com Sucesso!', `A senha do funcionário ${this.funcionarioObject.nome} é <strong>${password}</strong>`, 'success');
        this.router.navigate(['/funcionario']);
      } else {
        this.toastr.error(funcionarioAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }

  async resetarSenha() {
    const password = await this.generatePassword();
    this.funcionarioObject.senha = password;

    const funcionarioAddResponse = await this.ws.funcionarioResetPassword(this.funcionarioObject);
    if (funcionarioAddResponse != null) {
      if (funcionarioAddResponse['stats']) {
        swal.fire('Senha Atualizada Com Sucesso!', `A nova senha do funcionário ${this.funcionarioObject.nome} é <strong>${password}</strong>`, 'success');
        this.router.navigate(['/funcionario']);
      } else {
        this.toastr.error(funcionarioAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }

  async atualizarFuncionario() {
    const funcionarioAddResponse = await this.ws.funcionarioAtualizar(this.funcionarioObject);

    if (funcionarioAddResponse != null) {
      if (funcionarioAddResponse['stats']) {
        this.toastr.success(funcionarioAddResponse['message'], "Sucesso!");
        this.router.navigate(['/funcionario']);
      } else {
        this.toastr.error(funcionarioAddResponse['message'], "Ops!");
      }
    } else {
      this.toastr.error("Tente novamente!", "Ops!");
    }
  }

  async validaUsuario() {
    const input = this.elementRef.nativeElement.querySelector('#input_usuario');
    const msgValidacao = this.elementRef.nativeElement.querySelector('#msgValidacaoUsuario');

    input.addEventListener('keyup', () => {
      const Usuario = this.funcionarioObject.login;
      let contador = 0;

      if (this.ID_Funcionario == '') {
        this.usuariosArr.forEach(element => {
          if (Usuario == element.login) contador = 1;
        }); 
      } else {
        this.usuariosArr.forEach(element => {
          if (Usuario == element.login && this.ID_Funcionario != element.ID_func) contador = 1;
        }); 
      }

      if(contador == 1) {
        input.classList.add('invalid');
        msgValidacao.classList.add('d-block');
      } else {
        input.classList.remove('invalid');
        msgValidacao.classList.remove('d-block');
      }

    });

  }

   generatePassword() {
    var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  }

}
