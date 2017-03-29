import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ModalModule, PopoverModule } from 'ng2-bootstrap';
import { PageModule } from '../pagination/page.module';
import { LgModalComponent } from './lgModal.component';

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
        PopoverModule
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
        PopoverModule.forRoot()
    ],
})

export class SharedModule {
}