import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { LoggerService } from '../../services/logger/logger.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

    items: IngresoEgreso[];
    subscription: Subscription = new Subscription();

    constructor(private store: Store<AppState>,
        private logger: LoggerService) { }

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

    }

}
