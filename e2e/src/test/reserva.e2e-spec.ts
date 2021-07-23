import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ReservaPage } from '../page/reserva/reserva.po';
import { CalendarioPage } from '../page/calendario/calendario.po';
import { formatDate } from '@angular/common';

describe('workspace-project  reserva', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let reserva: ReservaPage;
    let calendario: CalendarioPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        reserva = new ReservaPage();
        calendario = new CalendarioPage();
    });

    it('Deberia listar reservas', () => {
        page.navigateTo();
        navBar.clickBotonReservas();

        expect(1).toBe(reserva.contarReservas());
    });

    it('Deberia cancelar reservas', () => {
        page.navigateTo();
        navBar.clickBotonReservas();

        reserva.clickCancelarReserva();
        browser.sleep(500);

        expect(reserva.laPrimeraReservaEstaCancelada()).toBeTruthy();
    });

    it('Deberia crear reserva', () => {
        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonAgregarReserva();
        
        reserva.seleccionarCancha(1);
        browser.sleep(500);
        
        reserva.seleccionarCliente(1);
        browser.sleep(500);
        
        reserva.seleccionarHora(2);
        browser.sleep(500);

        reserva.clickBotonRegistrarReserva();

        // Adicionamos las validaciones despues de la creación
        expect(2).toBe(reserva.contarReservas());

    });

    it('Deberia aumentar semana', () => {
        page.navigateTo();
        navBar.clickBotonReservas();
        //browser.sleep(2000);
        calendario.clickAumentarSemana();
        browser.sleep(500);

        let nuevaFecha = calendario.calcularNuevaSemana(1);
        let nuevaFechaText = formatDate(nuevaFecha, 'MMM d y', 'en', '-0500');
        
        expect(calendario.esFechaIgual(nuevaFechaText)).toBeTruthy();
        expect(0).toBe(reserva.contarReservas());
    });

    it('Deberia cambiar dia', () => {
        page.navigateTo();
        navBar.clickBotonReservas();
        calendario.clickDiaAnterior();
        browser.sleep(500);

        let nuevaFecha = calendario.calcularNuevoDia();
        let nuevaFechaText = formatDate(nuevaFecha, 'MMM d y', 'en', '-0500');
        
        expect(calendario.esFechaIgual(nuevaFechaText)).toBeTruthy();
        expect(0).toBe(reserva.contarReservas());
    });
    
});
