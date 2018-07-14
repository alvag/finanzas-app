import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

    usuario: User;
    subscription: Subscription = new Subscription();

    constructor(private authService: AuthService,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select('auth')
            .subscribe(auth => this.usuario = auth.user);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    logout() {
        this.authService.logout();
    }

}
