import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalCrearReservaComponent } from './modal-crear-reserva.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservaFormComponent } from '@reserva/shared/reserva-form/reserva-form.component';
import { CanchaService } from 'src/app/feature/cancha/shared/cancha.service';
import { ClienteService } from 'src/app/feature/cliente/shared/cliente.service';
import { of } from 'rxjs';

describe('ModalCrearReservaComponent', () => {
    let component: ModalCrearReservaComponent;
    let fixture: ComponentFixture<ModalCrearReservaComponent>;
    let canchaService: CanchaService;
    let clienteService: ClienteService;

    let opcionesCancha = [{ id: "1", descripcion: "cancha 1" }, { id: "2", descripcion: "cancha 2" }];
    let opcionesCliente = [{ id: "1", nombre: "pepito 1" }, { id: "2", nombre: "pepito 2" }]


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalCrearReservaComponent, ReservaFormComponent],
            imports: [
                CommonModule,
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [NgbActiveModal, HttpService, CanchaService, ClienteService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalCrearReservaComponent);
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

    it('deberia ser creado', () => {
        expect(component).toBeTruthy();
    });

    it('deberia emitir evento crearReserva', () => {
        spyOn(component.crearReserva, 'emit').and.callThrough();
        component.onCrear(1);
        expect(component.crearReserva.emit).toHaveBeenCalledWith(1);
    });
});
