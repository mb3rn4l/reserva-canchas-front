import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReservaComponent } from './listar-reserva.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Reserva } from '@reserva/shared/model/reserva';


describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  const reservasExperadas: Reserva[] = [
    new Reserva(1, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03"),
    new Reserva(2, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03")
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarReservaComponent],
      imports: [
        CommonModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    component.reservas = reservasExperadas;
    fixture.detectChanges();
  });

  it('deberia ser creado', () => {
    expect(component).toBeTruthy();
    expect(2).toBe(component.reservas.length)
  });

  it('deberia emitir evento cancelarReserva', () => {
    spyOn(component.cancelarReserva, 'emit').and.callThrough();

    component.onCancelarReserva(1);

    expect(component.cancelarReserva.emit).toHaveBeenCalledWith(1);
  });

});

