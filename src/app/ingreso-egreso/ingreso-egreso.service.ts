import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { LoggerService } from '../services/logger/logger.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IngresoEgresoService {

    constructor(private afDB: AngularFirestore,
        private authService: AuthService,
        private logger: LoggerService,
        private store: Store<AppState>) { }

    ingresoEgresoListener() {
        this.store.select('auth')
            .pipe(filter(auth => auth.user != null))
            .subscribe(auth => {
                this.logger.info(auth.user);
                this.ingresoEgresoItems(auth.user.uid);
            });
    }

    private ingresoEgresoItems(uid: string) {
        this.afDB.collection(`${uid}/ingresos-egresos/items`).valueChanges()
            .subscribe(items => {
                this.logger.info(items);
            });
    }

    crearIngresoEgreso(data: IngresoEgreso) {
        const user: User = this.authService.getUsuario();

        return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items')
            .add({ ...data });
    }
}
