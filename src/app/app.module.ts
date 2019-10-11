import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { effects, reducers } from './store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeModule } from './modules/home/home.module';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        HttpClientModule,
        BrowserTransferStateModule,
        HomeModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
        EffectsModule.forRoot(effects),
        environment.production ? StoreDevtoolsModule.instrument() : StoreDevtoolsModule.instrument()

    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule {
}
