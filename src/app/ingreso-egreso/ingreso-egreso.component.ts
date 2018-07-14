import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { LoggerService } from '../services/logger/logger.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styles: []
})
export class IngresoEgresoComponent implements OnInit {

    formData: FormGroup;
    tipo = 'ingreso';

    constructor(private ingresoEgresoService: IngresoEgresoService,
        private logger: LoggerService) { }

    ngOnInit() {
        this.formData = new FormGroup({
            descripcion: new FormControl('', Validators.required),
            monto: new FormControl(0, Validators.min(1))
        });
    }

    crearIngresoEgreso() {
        const ingresoEgreso = new IngresoEgreso({
            ...this.formData.value,
            tipo: this.tipo
        });

        this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
            .then(response => {
                this.logger.info(response);

                Swal('Creado', ingresoEgreso.descripcion, 'success');

                this.formData.reset({ monto: 0 });
            }).catch(error => {
                this.logger.info(error);
            });
    }

}
