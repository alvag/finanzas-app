import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { LoggerService } from '../../services/logger/logger.service';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

    items: IngresoEgreso[];
    subscription: Subscription = new Subscription();

    constructor(private store: Store<AppState>,
        private logger: LoggerService,
        private ingresoEgresoService: IngresoEgresoService) { }

    ngOnInit() {
        this.subscription = this.store.select('ingresoEgreso')
            .subscribe(data => {
                this.logger.info(data.items);
                this.items = data.items;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    borrarItem(uid: string) {

        Swal({
            title: 'Eliminar item',
            text: '¿Estás seguro que quieres eliminar este item?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.ingresoEgresoService.borrarIngresoEgreso(uid).then((response) => {
                    Swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        type: 'success',
                        title: 'Item eliminado'
                    });
                });
            }
        });




    }

}
