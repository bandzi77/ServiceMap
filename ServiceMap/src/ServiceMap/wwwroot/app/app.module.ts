/// <reference path="users/user.component.ts" />
/// <reference path="users/user.component.ts" />
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './servicesTnt/serviceTnt.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './users/user.component'
import { ServiceTntListComponent } from './servicesTnt/serviceTnt-list.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        // TODO - Do usuniêcia
        ProductModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: 'adduser', component: UserComponent },
            { path: 'serviceTnt', component: ServiceTntListComponent },
            { path: 'welcome', component: WelcomeComponent },

            { path: '', redirectTo: 'serviceTnt', pathMatch: 'full' },
            { path: '**', redirectTo: 'serviceTnt', pathMatch: 'full' },      ]),
        SharedModule
    ],
    declarations: [
        AppComponent,
        UserComponent,
        WelcomeComponent
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
