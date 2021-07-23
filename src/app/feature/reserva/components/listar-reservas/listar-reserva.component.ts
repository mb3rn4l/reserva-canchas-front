import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reserva } from '@reserva/shared/model/reserva';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.scss']
})
export class ListarReservaComponent {
  
  @Input()
  reservas: Reserva[];

  @Output()
  cancelarReserva = new EventEmitter<number>();

  constructor() { }

  onCancelarReserva(id: number){
    this.cancelarReserva.emit(id);
  }

}
