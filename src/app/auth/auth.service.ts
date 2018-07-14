import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { LoggerService } from '../services/logger/logger.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private usuario: User;
    private subscription: Subscription = new Subscription();

    constructor(private afAuth: AngularFireAuth,
        private router: Router,
        private afDB: AngularFirestore,
        private store: Store<AppState>,
        private logger: LoggerService) { }

    initAuthListener() {
        this.afAuth.authState.subscribe((fbUser: firebase.User) => {
            if (fbUser) {
                this.subscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
                    .subscribe((user: any) => {
                        const newUser = new User(user);
                        this.store.dispatch(new SetUserAction(newUser));
                        this.usuario = newUser;
                        this.logger.info('User Auth', this.usuario);
                    });
            } else {
                this.usuario = null;
                this.subscription.unsubscribe();
                this.logger.info('User Auth', this.usuario);
            }
        });
    }

    crearUsuario(nombre: string, email: string, password: string) {

        this.store.dispatch(new ActivarLoadingAction());

        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {

                const user: User = {
                    uid: response.user.uid,
                    nombre,
                    email: response.user.email
                };

                this.afDB.doc(`${user.uid}/usuario`).set(user)
                    .then(() => {
                        this.router.navigate(['/']);
                        this.store.dispatch(new DesactivarLoadingAction());
                    });

            }).catch(error => {
                console.log(error);
                this.store.dispatch(new DesactivarLoadingAction());
                Swal('Error al registrar', error.message, 'error');
            });
    }

    login(email: string, password: string) {
        this.store.dispatch(new ActivarLoadingAction());

        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
                this.store.dispatch(new DesactivarLoadingAction());
            }).catch(error => {
                console.log(error);
                Swal('Error en el login', error.message, 'error');
                this.store.dispatch(new DesactivarLoadingAction());
            });
    }

    logout() {
        this.router.navigate(['/login']);
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.afAuth.authState
            .pipe(
                map(fbUser => {
                    if (fbUser == null) {
                        this.router.navigate(['/login']);
                    }
                    return fbUser != null;
                })
            );
    }

    getUsuario(): User {
        return { ...this.usuario };
    }
}
