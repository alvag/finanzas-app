import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { LoggerService } from '../services/logger/logger.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../ingreso-egreso/ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';


@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

    formData: FormGroup;
    tipo = 'ingreso';
    loadingSubscription: Subscription = new Subscription();
    cargando: boolean;

    constructor(private ingresoEgresoService: IngresoEgresoService,
        private logger: LoggerService,
        private store: Store<AppState>) { }

    ngOnInit() {

        this.loadingSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

        this.formData = new FormGroup({
            descripcion: new FormControl('', Validators.required),
            monto: new FormControl(0, Validators.min(1))
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }

    crearIngresoEgreso() {
        this.store.dispatch(new ActivarLoadingAction());
        const ingresoEgreso = new IngresoEgreso({
            ...this.formData.value,
            tipo: this.tipo
        });

        this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
            .then(response => {
                this.logger.info(response);
                Swal('Creado', ingresoEgreso.descripcion, 'success');
                this.store.dispatch(new DesactivarLoadingAction());
                this.formData.reset({ monto: 0 });
            }).catch(error => {
                this.store.dispatch(new DesactivarLoadingAction());
                this.logger.info(error);
            });
    }

}
