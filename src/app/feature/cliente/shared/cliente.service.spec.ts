import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { ClienteService } from './cliente.service';
import { Cliente } from './model/cliente';


describe('ClienteService', () => {
  let httpMock: HttpTestingController;
  let service: ClienteService;
  const apiEndpointClientes = `${environment.endpoint}/clientes`;

  beforeEach(() => {

    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ClienteService);
  });

  it('deberia ser creado', () => {
    const clienteService: ClienteService = TestBed.inject(ClienteService);
    expect(clienteService).toBeTruthy();
  });


  it('deberia listar las Clientes para un select', () => {
    const dummyClientes = [
      new Cliente(),
      new Cliente()
    ];

    service.consultarOpciones().subscribe(Clientes => {
      expect(Clientes.length).toBe(2);
      expect(Clientes).toEqual(dummyClientes);
    });

    const req = httpMock.expectOne(apiEndpointClientes);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });

});


