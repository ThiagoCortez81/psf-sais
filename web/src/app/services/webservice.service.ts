import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  URL_SERVER: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  // PSF
  public async listPSF(idPSF?: string) {
    if (idPSF) {
      return await this.doGet('psf/list', idPSF);
    }

    return await this.doGet('psf/list', idPSF);
  }

  public async psfAdd(psfEntity: any): Promise<boolean> {
    if (psfEntity != null) {
      return await this.doPost('psf/add', psfEntity);
    }

    return false;
  }

  public async psfAtualizar(psfEntity: any): Promise<boolean> {
    if (psfEntity != null) {
      const id = psfEntity['ID_PSF'];
      delete psfEntity['ID_PSF'];

      return await this.doPut('psf/update', psfEntity, id);
    }

    return false;
  }

  public async psfDelete(psfEntity: any): Promise<boolean> {
    if (psfEntity != null) {
      return await this.doDelete('psf/delete', psfEntity);
    }

    return false;
  }

  // ============================================================================================ //
  // Visita

  public async listVisita(idVisita?: string) {
    if (idVisita) {
      return await this.doGet('visita/list', idVisita);
    }

    return await this.doGet('visita/list', idVisita);
  }

  public async visitaAdd(visitaEntity: any): Promise<boolean> {
    if (visitaEntity != null) {
      return await this.doPost('visita/add', visitaEntity);
    }
  }
  public async visitaDelete(psfEntity: any): Promise<boolean> {
    if (psfEntity != null) {
      return await this.doDelete('visita/delete', psfEntity);
    }

    return false;
  }

  // Funcionario
  public async fazLogin(loginReq: any) {
    return await this.doPost('auth/login', loginReq);
  }

  public async alteraSenhaPrimeiroAcesso(dadosAcesso: any) {
    return await this.doPost('auth/alteraSenhaPrimeiroAcesso', dadosAcesso);
  }

  public async listFuncionario(id?: string) {
    if (id) {
      return await this.doGet('funcionario/list', id);
    }

    return await this.doGet('funcionario/list');
  }

  public async listPerfil() {
    return await this.doGet('perfil/list');
  }

  public async funcionarioDelete(id: any): Promise<boolean> {
    if (id != null) {
      return await this.doDelete('funcionario/delete', id);
    }

    return false;
  }

  public async visitaAtualizar(visitaEntity: any): Promise<boolean> {
    if (visitaEntity != null) {
      const id = visitaEntity['ID_Visita'];
      delete visitaEntity['ID_Visita'];
      return await this.doPut('visita/update', visitaEntity, id);
    }
  }
  public async funcionarioAdd(funcionarioEntity: any): Promise<boolean> {
    if (funcionarioEntity != null) {
      return await this.doPost('funcionario/add', funcionarioEntity);
    }

    return false;
  }

  // ============================================================================================ //

  public async funcionarioAtualizar(funcionarioEntity: any): Promise<boolean> {
    if (funcionarioEntity != null) {
      const id = funcionarioEntity['ID_func'];
      delete funcionarioEntity['ID_func'];

      return await this.doPut('funcionario/update', funcionarioEntity, id);
    }

    return false;
  }

  public async listEstados() {
    return await this.doGetWithURL('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  }

  public async listMunicipios(idEstado: any) {
    return await this.doGetWithURL(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/distritos?orderBy=nome`);
  }

  // Métodos
  private async doPost(endpoint: string, body: any) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    return await this.http.post<any>(`${this.URL_SERVER}${endpoint}`, body, {headers: {'x-authentication-token': await this.tokenStorageService.getToken()}}).toPromise();
  }

  private async doPut(endpoint: string, body: any, id: string) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    return await this.http.put<any>(`${this.URL_SERVER}${endpoint}/${id}`, body).toPromise();
  }

  private async doGet(endpoint: string, id?: string) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    if (id)
      return await this.http.get<any>(`${this.URL_SERVER}${endpoint}/${id}`).toPromise();
    return await this.http.get<any>(`${this.URL_SERVER}${endpoint}`).toPromise();
  }

  private async doGetWithURL(URL_SERVER: string, id?: string) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    if (id)
      return await this.http.get<any>(`${URL_SERVER}/${id}`).toPromise();
    return await this.http.get<any>(`${URL_SERVER}`).toPromise();
  }

  private async doDelete(endpoint: string, id: string) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    return await this.http.delete<any>(`${this.URL_SERVER}${endpoint}/${id}`).toPromise();
  }
}