import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modal-crear-reserva',
  templateUrl: './modal-crear-reserva.component.html',
  styleUrls: ['./modal-crear-reserva.component.scss']
})
export class ModalCrearReservaComponent {

  @Output()
  crearReserva = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) { }

  onCrear(value) {
    this.crearReserva.emit(value);
  }

}