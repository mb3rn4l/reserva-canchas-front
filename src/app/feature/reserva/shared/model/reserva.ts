// import { Cancha } from "src/app/feature/cancha/shared/model/cancha";
// import { Cliente } from "src/app/feature/cliente/shared/model/cliente";


export class Reserva {
    id: number;
    cancha: { descripcion: string; };
    cliente: { nombre: string; };
    fecha: Date;
    horaInicial: number;
    horaFinal: number;
    estado: String;
    descuento: number;
    valorDePago: number;
    fechaCreacion: Date;
    
    
    constructor(id: number, cancha, cliente, fecha,  horaInicial, horaFinal, estado, descuento,  valorDePago, fechaCreacion,) {
        this.id = id;
        this.cancha = cancha;
        this.cliente = cliente;
        this.fecha = fecha;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
        this.estado = estado;
        this.descuento = descuento;
        this.valorDePago = valorDePago;
        this.fechaCreacion = fechaCreacion;
    }
}
