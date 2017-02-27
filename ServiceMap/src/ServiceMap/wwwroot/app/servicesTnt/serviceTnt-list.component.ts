import { Component, OnInit } from '@angular/core';
import { IServiceTnt, IServiceFilter } from './serviceTnt';
import { IPage } from '../pagination/page';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesTntService } from './serviceTnt.service';
import { Subscription } from 'rxjs'

@Component({
    templateUrl: 'app/servicesTnt/serviceTnt-list.component.html?v=${new Date().getTime()',
    styleUrls: ['app/servicesTnt/serviceTnt-list.component.css']
})

export class ServiceTntListComponent implements OnInit {
    busy: Subscription;
    pageTitle: string = "Lista Serwisów TNT";
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string;
    postCode: string;
    cityName: string;
    servicesTnt: IServiceTnt[];
    paging: IPage[];
    errorMessage: string;
    selecteditem: number;
    //currentPage: number = 1;

    private serviceFilter: IServiceFilter;

    constructor(private _serviceTntService: ServicesTntService, private _route: ActivatedRoute,
    ) {

    }

    searchServicesTnt(): void {

    }

    ngOnInit(): void {

        let id = +this._route.snapshot.params['currentPage'];

        //searchParams.set('postCode', serviceFilter.postCode);
        //searchParams.set('cityName', serviceFilter.cityName);
        //searchParams.set('currentPage', currentPage);

        //this.pageTitle += `:${id}`;

        //console.log('testowanie init');
        //this._serviceTntService.getServicesTnt()
        //    .subscribe(servicesTnt =>
        //        this.servicesTnt =
        //        servicesTnt,
        //    error => this.errorMessage = <any>error);
    }


    _createServiceFilter(page?: number): IServiceFilter {
        let _serviceFilter: IServiceFilter =
            {
                postCode: this.postCode,
                cityName: this.cityName,
                currentPage: page
            };

        return _serviceFilter;
    }

    private _getData(filtr: IServiceFilter) {
        this.busy = this._serviceTntService.searchServicesTnt(filtr)
            .subscribe(result => {
                this.servicesTnt = result.serviceTnt;
                this.paging = result.paging;
            },
            error => this.errorMessage = <any>error);
    }

    onSearchService() {
        console.log('testowanie init');
        let filtr = this._createServiceFilter();

        this._getData(filtr);
    }

    onPageClicked(page: number) {
        //this.currentPage = page;
        let filtr = this._createServiceFilter(page);
        this._getData(filtr);
        //alert("Kliknąłeś stronkę: " + page);
    }
    onClick(item: any, lgModal: any) {
        this.selecteditem = item;
        lgModal.show()
    }
}