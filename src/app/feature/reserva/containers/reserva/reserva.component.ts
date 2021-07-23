import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ReservaService } from '@reserva/shared/reserva.service';
import { Reserva } from '@reserva/shared/model/reserva';
import { ModalCrearReservaComponent } from '@reserva/components/modal-crear-reserva/modal-crear-reserva.component';


@Component({
  selector: 'reserva',
  styleUrls: ['reserva.component.scss'],
  templateUrl: './reserva.component.html',
})
export class ReservaComponent implements OnInit, OnDestroy {

  refModalCrear: NgbModalRef;
  date$: Observable<Date>;
  listaReservas$: Observable<Reserva[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private reservaService: ReservaService,
    private modalService: NgbModal
  ) { }

  changeDate(date: Date) {
    this.reservaService.actualizarFecha(date);
  }

  crearReserva(data) {
    this.reservaService.guardar(data).subscribe(() => {
      this.cerrarModalReserva();
    });
  }

  cancelarReserva(id: number) {
    this.reservaService.cancelar(id).subscribe();
  }

  ngOnInit() {
    this.date$ = this.reservaService.fecha$;
    this.listaReservas$ = this.reservaService.listaReservas$;

    this.subscriptions = [
      this.reservaService.reservas$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  abrirModalCrearReserva() {
    this.refModalCrear = this.modalService.open(ModalCrearReservaComponent);
    this.refModalCrear.componentInstance.crearReserva.subscribe((data) => {
      this.crearReserva(data)
    })
  }

  cerrarModalReserva() {
    this.refModalCrear.close();
  }

}