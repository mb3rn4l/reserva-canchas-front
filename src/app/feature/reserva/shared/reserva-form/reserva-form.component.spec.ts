
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReservaFormComponent } from './reserva-form.component';
import { CanchaService } from 'src/app/feature/cancha/shared/cancha.service';
import { ClienteService } from 'src/app/feature/cliente/shared/cliente.service';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';

describe('ReservaFormComponent', () => {
  let component: ReservaFormComponent;
  let fixture: ComponentFixture<ReservaFormComponent>;
  let canchaService: CanchaService;
  let clienteService: ClienteService;

  let opcionesCancha = [{id: "1", descripcion: "cancha 1"}, {id: "2", descripcion: "cancha 2"}];
  let opcionesCliente = [{id: "1", nombre: "pepito 1"}, {id: "2", nombre: "pepito 2"}]

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaFormComponent ],
      imports: [ 
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
       ], 
       providers: [HttpService, CanchaService, ClienteService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaFormComponent);
    component = fixture.componentInstance;
    
    canchaService = TestBed.inject(CanchaService);
    spyOn(canchaService, 'consultarOpciones').and.returnValue(
      of(opcionesCancha)
    );

    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'consultarOpciones').and.returnValue(
      of(opcionesCliente)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    component.opcionesCancha$.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });

    component.opcionesCliente$.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });

  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('formulario invalido cuando la fecha sea menor a la actual', () =>   {
    let fechaActual = new Date();
    let fechaMenosUnDia = new Date().setDate(fechaActual.getDate()-1);
    
    expect(component.form.valid).toBeFalsy();

    component.form.controls.idCliente.setValue('1');
    component.form.controls.idCancha.setValue('1');
    component.form.controls.fecha.setValue(formatDate(fechaMenosUnDia, 'yyyy-MM-dd', 'en'));
    component.form.controls.horaInicial.setValue('16');

    expect(component.form.valid).toBeFalsy();

  });


  it('deberia ser valido y llamar evento submitted', () => {
    
    spyOn(component.submitted, 'emit').and.callThrough();
    
    component.form.controls.idCliente.setValue('1');
    component.form.controls.idCancha.setValue('1');
    component.form.controls.fecha.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    component.form.controls.horaInicial.setValue('16');
    component.onSubmit();

    expect(component.submitted.emit).toHaveBeenCalledWith(component.form.value);
  });
});


