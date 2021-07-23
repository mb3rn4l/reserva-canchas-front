import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';

import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '@reserva/shared/model/reserva';


@Injectable()
export class ReservaService {

  fecha$ = new BehaviorSubject(new Date());
  listaReservas$ = new BehaviorSubject<Reserva[]>([]);

  reservas$: Observable<Reserva[]> = this.fecha$.pipe(
    switchMap((fecha: any) => {
      fecha = formatDate(fecha, 'yyyy-MM-dd', 'en', '-0500');
      return this.consultar(fecha);
    }),
    tap((reservas) => {
      this.listaReservas$.next([...reservas])
    })
  );

  constructor(protected http: HttpService) { }

  actualizarFecha(date: Date) {
    this.fecha$.next(date);
  }

  public consultar(fecha: string): Observable<Reserva[]> {
    let options = this.http.optsName('consultar reservas');
    const params = new HttpParams().set('fecha', fecha);

    return this.http.doGetParameters<Reserva[]>(`${environment.endpoint}/reservas`, params, options).pipe(
      catchError(err => {
        console.log('Error', err);
        return [];
      })
    );
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, boolean>(`${environment.endpoint}/reservas`, reserva,
      this.http.optsName('crear/actualizar reservas'))
      .pipe(
        tap(() => {
          let listaReservas = this.listaReservas$.value;
          let reservasActualizadas = [...listaReservas, reserva];
          this.listaReservas$.next([...reservasActualizadas])

        }),
      );
  }

  public cancelar(id: number) {
    return this.http.doPatchWithoutBody<boolean>(`${environment.endpoint}/reservas/cancelar/${id}`,
      this.http.optsName('crear/actualizar reservas'))
      .pipe(
        tap(() => {
          let listaReservas = this.listaReservas$.value;
          let reservasActualizadas = listaReservas.map((reserva) => {
            if (reserva.id === id) {
              return { ...reserva, ...{ estado: "CANCELADA" } }
            }
            return reserva;
          })

          this.listaReservas$.next([...reservasActualizadas])
        }),
        catchError(err => {
          console.log(err);
          return [false];
        })
      );
  }
}