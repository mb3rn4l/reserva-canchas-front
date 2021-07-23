import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'agenda-dias',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['agenda-dias.component.scss'],
  template: `
    <div class="days">
      
      <button
        type="button"
        class="day"
        *ngFor="let dia of dias; index as i;"
        (click)="seleccionarDia(i)">
        <span [class.active]="i === diaSeleccionado">
          {{ dia }}
        </span>
      </button>

    </div>
  `
})
export class AgendaDiasComponent {

  dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  @Input()
  diaSeleccionado: number;

  @Output()
  cambiarDia = new EventEmitter<number>();

  seleccionarDia(index: number) {
    this.cambiarDia.emit(index);
  }

}