import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule
            .forRoot([
                { path: '', redirectTo: 'welcome', pathMatch: 'full' }
            //{ path: 'welcome', component: AppComponent },
        //    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        //    { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
        ]),
        FormsModule
    ],
  declarations: [
      AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
