import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 

import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';

import { ClienteOptions } from './model/cliente';


@Injectable()
export class ClienteService {

  constructor(protected http: HttpService) { }

  public consultarOpciones(): Observable<ClienteOptions[]> {
    return this.http.doGet<ClienteOptions[]>(`${environment.endpoint}/clientes`, this.http.optsName('consultar las opciones de clientes para un select'));
  }

}