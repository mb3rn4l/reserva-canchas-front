import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'agenda-calendario',
  styleUrls: ['agenda-calendario.component.scss'],
  template: `
    <div class="calendar">     
      <agenda-controles
        [fecha]="dia"
        (cambiarFecha)="cambiarSemana($event)">
      </agenda-controles>

      <agenda-dias
        [diaSeleccionado]="indiceDia"
        (cambiarDia)="seleccionarDia($event)">
      </agenda-dias>
    </div>
  `
})
export class AgendaCalendarioComponent implements OnChanges {

  indiceDia: number;
  dia: Date;
  semana: Date;

  @Input()
  set fecha(fecha: Date) {
    this.dia = new Date(fecha.getTime());
  }

  @Output()
  change = new EventEmitter<Date>();

  constructor() {}

  ngOnChanges() {
    this.indiceDia = this.getIndiceDia(this.dia);
    this.semana = this.getInicioSemana(new Date(this.dia));
  }

  seleccionarDia(index: number) {
    const diaSeleccionado = new Date(this.semana);
    diaSeleccionado.setDate(diaSeleccionado.getDate() + index);
    this.change.emit(diaSeleccionado);
  }

  cambiarSemana(semana: number) {
    const inicioSemana = this.getInicioSemana(new Date());
    const fechaInicio = (
      new Date(inicioSemana.getFullYear(), inicioSemana.getMonth(), inicioSemana.getDate())
    );
    fechaInicio.setDate(fechaInicio.getDate() + (semana * 7));
    this.change.emit(fechaInicio);
  }

  private getIndiceDia(date: Date) {
    let indiceDia = date.getDay() - 1;
    if (indiceDia < 0) {
      indiceDia = 6;
    }
    return indiceDia;
  }

  private getInicioSemana(date: Date) {
    const dia = date.getDay();
    const diferencia = date.getDate() - dia + (dia === 0 ? -6 : 1);
    return new Date(date.setDate(diferencia));
  }

}