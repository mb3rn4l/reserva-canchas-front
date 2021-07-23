import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 

import { CanchaService } from './cancha.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Cancha } from './model/cancha';

describe('CanchaService', () => {
  let httpMock: HttpTestingController;
  let service: CanchaService;
  const apiEndpointCanchas = `${environment.endpoint}/canchas`;

  beforeEach(() => {
    
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CanchaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CanchaService);
  });

  it('deberia ser creado', () => {
    const canchaService: CanchaService = TestBed.inject(CanchaService);
    expect(canchaService).toBeTruthy();
  });

  
  it('deberia listar las canchas para un select', () => {
    const dummyCanchas = [
      new Cancha(),
      new Cancha()
    ];

    service.consultarOpciones().subscribe(canchas => {
      expect(canchas.length).toBe(2);
      expect(canchas).toEqual(dummyCanchas);
    });

    const req = httpMock.expectOne(apiEndpointCanchas);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCanchas);
  });

});


