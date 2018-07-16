import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-rounting.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { AppComponent } from './app.component';
import { LoggerService } from './services/logger/logger.service';
import { ConsoleLoggerService } from './services/logger/console-logger.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })
    ],
    providers: [
        { provide: LoggerService, useClass: ConsoleLoggerService },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
