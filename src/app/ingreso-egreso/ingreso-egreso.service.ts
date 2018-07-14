import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { LoggerService } from '../services/logger/logger.service';

@Injectable({
    providedIn: 'root'
})
export class IngresoEgresoService {

    constructor(private afDB: AngularFirestore,
        private authService: AuthService) { }

    crearIngresoEgreso(data: IngresoEgreso) {
        const user: User = this.authService.getUsuario();

        return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items')
            .add({ ...data });
    }
}
