
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/reserva.service';
import { of } from 'rxjs';
import { ReservaComponent } from "./reserva.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('reservaComponent', () => {
  let component: ReservaComponent;
  let fixture: ComponentFixture<ReservaComponent>;
  let reservaService: ReservaService;
  const listaReservas: Reserva[] = [
    new Reserva(1, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03"),
    new Reserva(2, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03")
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [NgbModal, ReservaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'consultar').and.returnValue(
      of(listaReservas)
    );

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();

    component.listaReservas$.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });
});
