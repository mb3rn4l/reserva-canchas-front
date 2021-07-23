import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared modules
import { SharedModule } from '@shared/shared.module';

import { ReservaRoutingModule } from './reserva-routing.module';

// containers
import { AgendaCalendarioComponent } from '@core/components/agenda-calendario/agenda-calendario.component';
import { AgendaDiasComponent } from '@core/components/agenda-dias/agenda-dias.component';
import { AgendaControlesComponent } from '@core/components/agenda-controles/agenda-controles.component';


import { ReservaComponent } from './containers/reserva/reserva.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalCrearReservaComponent } from './components/modal-crear-reserva/modal-crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reservas/listar-reserva.component';
import { ReservaFormComponent } from './shared/reserva-form/reserva-form.component';
import { ReservaService } from './shared/reserva.service';
import { CanchaService } from '../cancha/shared/cancha.service';
import { ClienteService } from '../cliente/shared/cliente.service';


@NgModule({
  imports: [
    CommonModule,
    ReservaRoutingModule,
    SharedModule
  ],
  declarations: [
    ReservaComponent,
    ReservaFormComponent,
    ModalCrearReservaComponent,
    AgendaCalendarioComponent,
    AgendaDiasComponent,
    AgendaControlesComponent,
    ListarReservaComponent

  ], 
  providers: [ReservaService, NgbActiveModal, CanchaService, ClienteService]
})
export class ReservaModule {}