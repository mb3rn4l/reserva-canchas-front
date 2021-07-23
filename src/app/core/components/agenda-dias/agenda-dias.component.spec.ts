import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AgendaDiasComponent } from './agenda-dias.component';


describe('AgendaDiasComponent', () => {
    let component: AgendaDiasComponent;
    let fixture: ComponentFixture<AgendaDiasComponent>;
    let diaSeleccionado = 0;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AgendaDiasComponent],
            imports: [
                CommonModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AgendaDiasComponent);
        component = fixture.componentInstance;
        component.diaSeleccionado = diaSeleccionado;
        fixture.detectChanges();
    });

    it('deberia ser creado', () => {
        expect(component).toBeTruthy();
        expect(diaSeleccionado).toEqual(component.diaSeleccionado);
    });

    it('deberia emitir evento', () => {
        spyOn(component.cambiarDia, 'emit').and.callThrough();

        component.seleccionarDia(4);

        expect(component.cambiarDia.emit).toHaveBeenCalledWith(4);
    });
})
