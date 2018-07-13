import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { database } from 'firebase';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    onSubmit(formData: any) {
        this.authService.crearUsuario(formData.nombre, formData.email, formData.password);
    }

}
