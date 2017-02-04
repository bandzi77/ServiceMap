import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';
import { ServiceTntListComponent } from './serviceTnt-list.component';
import { ServiceTntDetailGuard } from './serviceTnt-guard.service';
import { ServiceTntDetailComponent } from './serviceTnt-detail.component';
import { ServicesTntFilterPipe } from './serviceTnt-filter.pipe';

import { ServicesTntService } from './serviceTnt.service';
import { SheredModule } from '../shared/shared.module';
import { PageModule } from '../pagination/page.module';

@NgModule({
    declarations: [
        ServiceTntListComponent,
        ServiceTntDetailComponent,
        ServicesTntFilterPipe
    ],
    imports: [
        PageModule,
        SheredModule,
        RouterModule.forChild([
            { path: 'serviceTnt', component: ServiceTntListComponent },
            {
                path: 'serviceTnt/:id',
                canActivate: [ServiceTntDetailGuard],
                component: ServiceTntDetailComponent
            },
        ])
    ],
    providers: [
        ServicesTntService,
        ServiceTntDetailGuard
    ]
})

export class ProductModule { }