import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { database } from 'firebase';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

    cargando: boolean;
    subscription: Subscription = new Subscription();

    constructor(private authService: AuthService,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit(formData: any) {
        this.authService.crearUsuario(formData.nombre, formData.email, formData.password);
    }

}
