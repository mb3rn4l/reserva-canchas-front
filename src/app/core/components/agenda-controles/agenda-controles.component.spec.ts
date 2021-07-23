import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { AgendaControlesComponent } from './agenda-controles.component';


describe('AgendaDiasComponent', () => {
    let component: AgendaControlesComponent;
    let fixture: ComponentFixture<AgendaControlesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AgendaControlesComponent],
            imports: [
                CommonModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AgendaControlesComponent);
        component = fixture.componentInstance;
        component.fecha = new Date();
        fixture.detectChanges();
    });

    it('deberia ser creado', () => {
        expect(component).toBeTruthy();
        expect(0).toEqual(component.offset);
    });

    it('deberia emitir evento', () => {
        spyOn(component.cambiarFecha, 'emit').and.callThrough();

        component.moverFecha(1);

        expect(component.offset).toBe(1);
        expect(component.cambiarFecha.emit).toHaveBeenCalledWith(1);
    });
})