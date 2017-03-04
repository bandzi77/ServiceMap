﻿import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';
import { ServiceTntListComponent } from './serviceTnt-list.component';
import { ServiceTntDetailGuard } from './serviceTnt-guard.service';
import { ServiceTntDetailComponent } from './depot-detail.component';
import { ServicesTntFilterPipe } from './serviceTnt-filter.pipe';

import { ServicesTntService } from './serviceTnt.service';
import { SharedModule } from '../shared/shared.module';





@NgModule({
    declarations: [
        ServiceTntListComponent,
        ServiceTntDetailComponent,
        ServicesTntFilterPipe
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'serviceTnt', component: ServiceTntListComponent },
            {
                path: 'serviceTnt/:id',
                canActivate: [ServiceTntDetailGuard],
                component: ServiceTntDetailComponent
            },
        ]),

    ],
    providers: [
        ServicesTntService,
        ServiceTntDetailGuard
    ]
})

export class ProductModule { }