import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SmSharedModule } from './shared/shared.module';
import { ServiceTntModule } from './servicesTnt/serviceTnt.module';
import { UserService } from './users/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserComponent } from './users/user.component';
import { ServiceTntListComponent } from './servicesTnt/serviceTnt-list.component';
import { ProductModule } from './users/user-module';
import { UserListComponent } from './users/user-list.component';

@NgModule({
    imports: [
        HttpModule,
        // TODO - Do usuniecia

        ReactiveFormsModule,
        RouterModule.forRoot([
            //{ path: 'welcome', component: WelcomeComponent },
            //{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
            //{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
            { path: 'serviceTnt', component: ServiceTntListComponent },
            { path: '', redirectTo: 'serviceTnt', pathMatch: 'full' },
            { path: '**', redirectTo: 'serviceTnt', pathMatch: 'full' },      
        ]),
        SmSharedModule,
        ProductModule,
        ServiceTntModule
    ],
    declarations: [
        AppComponent
    ],
    providers:[UserService],
    bootstrap: [AppComponent]
    
})

export class AppModule { }
