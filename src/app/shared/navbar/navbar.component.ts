import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

    usuario: User;
    subscription: Subscription = new Subscription();

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select('auth')
            .subscribe(auth => this.usuario = auth.user);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
