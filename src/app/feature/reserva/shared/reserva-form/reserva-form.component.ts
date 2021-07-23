import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { CanchaService } from 'src/app/feature/cancha/shared/cancha.service';
import { ClienteService } from 'src/app/feature/cliente/shared/cliente.service';
import { ReservaValidators } from "./reserva-form.validators";
import { Observable } from 'rxjs';
import { CanchaOptions } from 'src/app/feature/cancha/shared/model/cancha';
import { ClienteOptions } from 'src/app/feature/cliente/shared/model/cliente';

@Component({
  selector: 'reserva-form',
  styleUrls: ['reserva-form.component.scss'],
  templateUrl: './reserva-form.component.html',
})
export class ReservaFormComponent implements OnInit{
    @Output()
    submitted = new EventEmitter<FormGroup>();

    opcionesCancha$: Observable<CanchaOptions[]>;
    opcionesCliente$: Observable<ClienteOptions[]>;

    horas = [
        {valor: 16, descripcion: "4 PM"},
        {valor: 17, descripcion: "5 PM"},
        {valor: 18, descripcion: "6 PM"},
        {valor: 19, descripcion: "7 PM"},
        {valor: 20, descripcion: "8 PM"},
        {valor: 21, descripcion: "9 PM"},
        {valor: 22, descripcion: "10 PM"},
    ]

    form = this.fb.group({
        idCliente: ['', [Validators.required]],
        idCancha: ['', [Validators.required]],
        fecha: [formatDate(new Date(), 'yyyy-MM-dd', 'en', '-0500'), [Validators.required, ReservaValidators.fechaMenor]],
        horaInicial: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        private canchaService: CanchaService, 
        private clienteService: ClienteService

    ) {}
  
    ngOnInit(): void {
      this.opcionesCancha$ = this.canchaService.consultarOpciones();
      this.opcionesCliente$ = this.clienteService.consultarOpciones();
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
  
  get idClienteObligatorio() {
    const control = this.form.get('idCliente');
    return control.hasError('required') && control.touched;
  }

  get idCanchaObligatorio() {
    const control = this.form.get('idCancha');
    return control.hasError('required') && control.touched;
  }

  get fechaObligatorio() {
    const control = this.form.get('fecha');
    return control.hasError('required') && control.touched;
  }

  get horaInicialObligatorio() {
    const control = this.form.get('horaInicial');
    return control.hasError('required') && control.touched;
  }

  get fechaMenor(){
    const control = this.form.get('fecha');
    return control.hasError('fechaMenor');
  }
  
}
