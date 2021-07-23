import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'; //, of  
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';

import { CanchaOptions } from './model/cancha';


@Injectable()
export class CanchaService {
  

  constructor(protected http: HttpService) {}


  public consultarOpciones(): Observable<CanchaOptions[]> {

    // return of([
    //   {
    //     id: "1",
    //     descripcion: "cancha 1"
    //   }, 
    //   {
    //     id: "2",
    //     descripcion: "cancha 2"
        
    //   }]);
    return this.http.doGet<CanchaOptions[]>(`${environment.endpoint}/canchas`, this.http.optsName('consultar las opciones de canchas para un select'));
  }

}