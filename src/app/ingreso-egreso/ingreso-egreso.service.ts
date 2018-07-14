import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { LoggerService } from '../services/logger/logger.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IngresoEgresoService {

    subscriptions: Subscription[] = [];

    constructor(private afDB: AngularFirestore,
        private authService: AuthService,
        private store: Store<AppState>) { }

    cancelarSubscriptions() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ingresoEgresoListener() {
        this.subscriptions.push(this.store.select('auth')
            .pipe(filter(auth => auth.user != null))
            .subscribe(auth => {
                this.ingresoEgresoItems(auth.user.uid);
            }));
    }

    private ingresoEgresoItems(uid: string) {
        this.subscriptions.push(this.afDB.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
            .pipe(
                map(items => {
                    return items.map(doc => {
                        return {
                            uid: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        };
                    });
                })
            )
            .subscribe((items: any[]) => {
                this.store.dispatch(new SetItemsAction(items));
            }));
    }

    crearIngresoEgreso(data: IngresoEgreso) {
        const user: User = this.authService.getUsuario();

        return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items')
            .add({ ...data });
    }

    borrarIngresoEgreso(uid: string) {
        const user: User = this.authService.getUsuario();

        return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
            .delete();
    }
}
