import { AbstractControl } from "@angular/forms";

export class ReservaValidators {
    static fechaMenor(control: AbstractControl){

        let split =  control.value.split('-');
        let ahora = new Date();
        
        let anioMenor = parseInt(split[0]) <  ahora.getFullYear();
        let mesMenor = parseInt(split[1]) < ahora.getMonth() + 1;
        let diaMenor = parseInt(split[2]) < ahora.getDate();

        return anioMenor || mesMenor || diaMenor ? { fechaMenor: true } : null;

    }
}