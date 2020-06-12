import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  URL_SERVER: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

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

    return false;
  }

  public async visitaAtualizar(visitaEntity: any): Promise<boolean> {
    if (visitaEntity != null) {
      const id = visitaEntity['ID_Visita'];
      delete visitaEntity['ID_Visita'];
      return await this.doPut('visita/update', visitaEntity, id);
    }

    return false;
  }

  // ============================================================================================ //

  private async doPost(endpoint: string, body: any) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    return await this.http.post<any>(`${this.URL_SERVER}${endpoint}`, body).toPromise();
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

  private async doDelete(endpoint: string, id: string) {
    // TODO: ADD HEADER DE AUTENTICAÇÃO
    return await this.http.delete<any>(`${this.URL_SERVER}${endpoint}/${id}`).toPromise();
  }
}
