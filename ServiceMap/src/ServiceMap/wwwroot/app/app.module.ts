import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SheredModule } from './shared/shared.module';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './servicesTnt/serviceTnt.module';



@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
        ]),
        ProductModule,
        SheredModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
