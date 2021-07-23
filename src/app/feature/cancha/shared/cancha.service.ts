import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';

import { CanchaOptions } from './model/cancha';


@Injectable()
export class CanchaService {

  constructor(protected http: HttpService) { }

  public consultarOpciones(): Observable<CanchaOptions[]> {
    return this.http.doGet<CanchaOptions[]>(`${environment.endpoint}/canchas`, this.http.optsName('consultar las opciones de canchas para un select'));
  }

}