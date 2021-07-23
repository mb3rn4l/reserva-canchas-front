
import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from './reserva.service';
import { Reserva } from './model/reserva';


describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let service: ReservaService;
  const apiEndpointReservas = `${environment.endpoint}/reservas`;
  const dummyReservas = [
    new Reserva(1, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03"),
    new Reserva(2, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03")
  ];

  beforeEach(() => {

    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('deberia ser creado', () => {
    const reservaService: ReservaService = TestBed.inject(ReservaService);
    expect(reservaService).toBeTruthy();
  });


  it('deberia listar reservas', () => {
    const fecha = new Date().toISOString();

    service.consultar(fecha).subscribe(reservas => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReservas);
    });

    const req = httpMock.expectOne(`${apiEndpointReservas}?fecha=${fecha}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservas);
  });

  it('deberia crear una reserva', () => {
    spyOn(service, 'consultar').and.returnValue(
      of(dummyReservas)
    );
    service.reservas$.subscribe();

    const dummyreserva = new Reserva(1, 'cancha 1', "cliente 1", "2021-07-16", 16, 17, "REGISTRADA", 0, 80000, "2021-07-16T12:39:03");

    service.guardar(dummyreserva).subscribe((respuesta: any) => {
      expect(respuesta.hasOwnProperty('valor')).toBeTruthy();

      // prueba que se agregue una reserva a la lista
      service.listaReservas$.subscribe(lista => {
        expect(lista.length).toEqual(3);
      })
    });

    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<any>({ body: { valor: 1 } }));
  });

  it('deberia cancelar una reserva', () => {


    spyOn(service, 'consultar').and.returnValue(
      of(dummyReservas)
    );
    service.reservas$.subscribe();

    let id = 1;
    service.cancelar(id).subscribe((respuesta: any) => {
      //prueba la respuesta del servicio
      expect(respuesta).toEqual(true);

      //prueba que se actualice la lista de reservas 
      service.listaReservas$.subscribe(lista => {
        let actualizada: Reserva = lista.find((reserva) => {
          return reserva.id == 1
        });

        expect(actualizada.estado).toEqual('CANCELADA');
      })

    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/cancelar/${id}`);
    expect(req.request.method).toBe('PATCH');
    req.event(new HttpResponse<any>({ body: true })); 
  });

});


