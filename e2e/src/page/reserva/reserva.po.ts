import { by, element } from 'protractor';

export class ReservaPage {
    private buttonAgregarReserva = element(by.id('agregar-reserva'));
    private buttonRegistrar = element(by.id('registrar-reserva'));
    private buttonCancelar = element(by.id('cancelar-1'));

    private inputCancha = element(by.id('idCancha'));
    private inputCliente = element(by.id('idCliente'));
    private inputHora = element(by.id('horaInicial'));

    private listaReservas = element.all(by.css('.card'));

    async clickBotonAgregarReserva() {
        await this.buttonAgregarReserva.click();
    }

    async clickBotonRegistrarReserva() {
        await this.buttonRegistrar.click();
    }

    async clickCancelarReserva(){
        await this.buttonCancelar.click();
    }

    async seleccionarCancha(idCancha) {
        await this.inputCancha.element(by.css(`option:nth-child(${idCancha})`)).click();
    }

    async seleccionarCliente(idCliente) {
        await this.inputCliente.element(by.css(`option:nth-child(${idCliente})`)).click();
    }

    async seleccionarHora(horaReserva) {
        await this.inputHora.element(by.css(`option:nth-child(${horaReserva})`)).click();
    }

    async contarReservas() {
        return this.listaReservas.count();
    }

    async laPrimeraReservaEstaCancelada(){
       let cardText = await element(by.css('.card:first-child')).getText();
       return cardText.includes('CANCELADA');
    }

}
