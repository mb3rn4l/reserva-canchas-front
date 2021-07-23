import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'agenda-controles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['agenda-controles.component.scss'],
  template: `
    <div class="controls">
      
      <button 
        type="button"
        (click)="moverFecha(offset - 1)">
        <
      </button>
      <p>{{ fecha | date:'MMM d y' }}</p>
      <button 
        type="button"
        (click)="moverFecha(offset + 1)">
        >
      </button>

    </div>
  `
})
export class AgendaControlesComponent {

  offset = 0;

  @Input()
  fecha: Date;

  @Output()
  cambiarFecha = new EventEmitter<number>();

  moverFecha(offset: number) {
    this.offset = offset;
    this.cambiarFecha.emit(offset);
  }

}