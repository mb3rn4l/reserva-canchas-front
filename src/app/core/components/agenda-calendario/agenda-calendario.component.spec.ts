import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AgendaCalendarioComponent } from "./agenda-calendario.component";
import { AgendaDiasComponent } from '../agenda-dias/agenda-dias.component';
import { AgendaControlesComponent } from '../agenda-controles/agenda-controles.component';
import { By } from '@angular/platform-browser';

describe('AgendaCalendarioComponent', () => {
    let component: AgendaCalendarioComponent;
    let fixture: ComponentFixture<AgendaCalendarioComponent>;
    let fecha = new Date();

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AgendaCalendarioComponent, AgendaDiasComponent, AgendaControlesComponent],
            imports: [
                CommonModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AgendaCalendarioComponent);
        component = fixture.componentInstance;

        fecha.setUTCFullYear(2021);
        fecha.setMonth(6)
        fecha.setDate(21);

        component.fecha = fecha;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('deberia ser creado', () => {
        expect(component).toBeTruthy();
        expect(fecha).toEqual(component.dia);
        expect(2).toBe(component.indiceDia);
        expect(19).toBe(component.semana.getDate());
    });

    it('deberia seleccionar dia y emitir evento', () => {
        spyOn(component.change, 'emit').and.callThrough();

        let fechaNuevaDia = new Date(fecha);
        fechaNuevaDia.setDate(23);
        component.seleccionarDia(4);

        expect(component.change.emit).toHaveBeenCalledWith(fechaNuevaDia);
    });

    it('deberia cambiar semana y emitir evento', () => {
        spyOn(component.change, 'emit').and.callThrough();

        // simula dar clic en el boton para cambiar la semana
        let buttonLeft = fixture.debugElement.query(By.css('button:first-child'));
        buttonLeft.triggerEventHandler('click', null);

        let fechaNuevaSemana = new Date(2021, 6, 12);

        expect(component.change.emit).toHaveBeenCalledWith(fechaNuevaSemana);
    });

});
