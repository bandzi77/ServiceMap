﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ModalModule } from 'ng2-bootstrap';
import { PageModule } from '../pagination/page.module';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        BusyModule,
        ModalModule,
        PageModule
    ],
    imports: [
        BusyModule.forRoot(
            new BusyConfig({
                backdrop: true,
                delay: 0,
                minDuration: 0
            })
        ),
        ModalModule.forRoot()
    ],
})

export class SheredModule {

}