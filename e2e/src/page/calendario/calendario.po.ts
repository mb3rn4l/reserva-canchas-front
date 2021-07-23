import { by, element } from 'protractor';

export class CalendarioPage {

    private buttonDisminuirSemana = element(by.xpath('/html/body/app-root/reserva/div/div/div[3]/agenda-calendario/div/agenda-controles/div/button[1]'));
    private buttonAumentarSemana = element(by.xpath('/html/body/app-root/reserva/div/div/div[3]/agenda-calendario/div/agenda-controles/div/button[2]'));
    private fechaCalendario = element(by.xpath('/html/body/app-root/reserva/div/div/div[3]/agenda-calendario/div/agenda-controles/div/p'))
    private days = element(by.className('days'))
    
    async clickAumentarSemana(){
        this.buttonAumentarSemana.click();
    }

    async clickDisminuirSemana(){
        await this.buttonDisminuirSemana.click();
    }

    async clickDiaAnterior(){
        const dia = new Date().getDay();
        let indiceNuevoDia = dia === 0 ? 5 : dia -1;
        this.days.element(by.css(`.day:nth-child(${indiceNuevoDia})`)).click();
    }


    async esFechaIgual(fecha){
        let fechaText = await this.fechaCalendario.getText();
        return fechaText === fecha;
    }



    // para atras -1 para adelante 1
    calcularNuevaSemana(semana: number) {
        const inicioSemana = this.calcularInicioSemana(new Date());
        const fechaInicio = (
            new Date(inicioSemana.getFullYear(), inicioSemana.getMonth(), inicioSemana.getDate())
        );
        fechaInicio.setDate(fechaInicio.getDate() + (semana * 7));
        return fechaInicio
    }


    calcularNuevoDia() {
        const diaSeleccionado = new Date();
        diaSeleccionado.setDate(diaSeleccionado.getDate() - 1);
        return diaSeleccionado;
    }
    
    private calcularInicioSemana(date: Date) {
        const dia = date.getDay();
        const diferencia = date.getDate() - dia + (dia === 0 ? -6 : 1);
        return new Date(date.setDate(diferencia));
    }

}