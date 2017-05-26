﻿import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ModalModule, PopoverModule } from 'ng2-bootstrap';
import { PageModule } from '../pagination/page.module';
import { LgModalComponent } from './lgModal.component';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './toastr-custom-option';
import { DataTableModule, SharedModule, MultiSelectModule, ToggleButtonModule } from 'primeng/primeng';



@NgModule({
    declarations: [
        LgModalComponent
    ],
    exports: [
        CommonModule,
        BusyModule,
        FormsModule,
        LgModalComponent,
        ModalModule,
        PageModule,
        PopoverModule,
        ToastModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule,
        ToggleButtonModule 
    ],
    imports: [
        CommonModule,
        BusyModule.forRoot(
            new BusyConfig({
                backdrop: true,
                delay: 0,
                minDuration: 0
            })
        ),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [
        {
            provide: ToastOptions,
            useClass: CustomOption
        }]

})

export class SmSharedModule {
}