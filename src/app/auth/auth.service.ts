import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth,
        private router: Router) { }

    crearUsuario(nombre: string, email: string, password: string) {

        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.router.navigate(['/']);
            }).catch(error => {
                console.log(error);
            });
    }

    login(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.router.navigate(['/']);
            }).catch(error => {
                console.log(error);
            });
    }
}
