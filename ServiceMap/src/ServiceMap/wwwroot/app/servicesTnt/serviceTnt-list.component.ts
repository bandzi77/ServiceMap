import { Component, OnInit } from '@angular/core';
import { IServiceTnt } from './serviceTnt';
import { ServicesTntService } from './serviceTnt.service';

@Component({
    templateUrl: 'app/servicesTnt/serviceTnt-list.component.html?v=${new Date().getTime()',
    styleUrls: ['app/servicesTnt/serviceTnt-list.component.css']
})

export class ServiceTntListComponent implements OnInit {

    pageTitle: string = "Lista Serwisów TNT !";
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string;
    servicesTnt: IServiceTnt[];
    errorMessage: string;
    currentPage: number = 1;

    constructor(private _serviceTntService: ServicesTntService) {

    }

    searchServicesTnt(): void {

    }

    ngOnInit(): void {
        console.log('testowanie init');
        this._serviceTntService.getServicesTnt()
            .subscribe(servicesTnt => this.servicesTnt = servicesTnt,
            error => this.errorMessage = <any>error);
    }


    onPageClicked(page: number) {
        this.currentPage = page;
        alert("Kliknąłeś stronkę: " + page);

    }
}