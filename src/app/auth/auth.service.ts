import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth,
        private router: Router) { }

    initAuthListener() {
        this.afAuth.authState.subscribe((fbUser: firebase.User) => {
            console.log(fbUser);
        });
    }

    crearUsuario(nombre: string, email: string, password: string) {

        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
            }).catch(error => {
                console.log(error);
                Swal('Error al registrar', error.message, 'error');
            });
    }

    login(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
            }).catch(error => {
                console.log(error);
                Swal('Error en el login', error.message, 'error');
            });
    }

    logout() {
        this.router.navigate(['/login']);
        this.afAuth.auth.signOut();
    }
}
