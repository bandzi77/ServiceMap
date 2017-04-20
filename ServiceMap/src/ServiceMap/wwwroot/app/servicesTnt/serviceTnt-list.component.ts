import { Component, OnInit, ViewChild } from '@angular/core';
import { IServiceTnt, IServiceFilter } from './serviceTnt';
import { IDepotDetails, IDepotDetailsFilter } from './depotDetails';
import { IPage } from '../pagination/page';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesTntService } from './serviceTnt.service';
import { Subscription } from 'rxjs';
import { LgModalComponent } from '../shared/lgModal.component';

@Component({
    templateUrl: 'app/servicesTnt/serviceTnt-list.component.html?v=${new Date().getTime()',
    styleUrls: ['app/servicesTnt/serviceTnt-list.component.css']
})

export class ServiceTntListComponent implements OnInit {
    busyIndicator: Subscription;
    pageTitle: string = "Mapa Serwisowa";
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string;
    postCode: string = '';
    cityName: string = '';
    servicesTnt: IServiceTnt[];
    depotTnt: IDepotDetails[];
    paging: IPage[];
    errorMessage: string;
    private serviceFilter: IServiceFilter;
    @ViewChild('lgModal') lgModalRef: LgModalComponent;

    constructor(private _serviceTntService: ServicesTntService, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        let id = +this._route.snapshot.params['currentPage'];
    }

    private _getData(filtr: IServiceFilter) {

        this._setPage(filtr);
        this.busyIndicator = this._serviceTntService.searchServicesTnt(filtr)
            .subscribe(result => {
                this.servicesTnt = result.serviceTnt;
                this.paging = result.paging;
            },
            error => this.errorMessage = <any>error);
    }

    _setPage(serviceFilter: IServiceFilter): void {
        if (serviceFilter.currentPage === undefined) {
            serviceFilter.currentPage = null;
        };
    }

    onSearchService() {
        console.log('testowanie init');
        let filtr = this._createServiceFilter();

        this._getData(filtr);
    }

    onPageClicked(page: number) {
        let filtr = this._createServiceFilter(page);
        this._getData(filtr);
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

    onClick(item: any) {
        let filtr: IDepotDetailsFilter = { depotCode: item };
        this.busyIndicator = this._serviceTntService.getDepotDetails(filtr).subscribe(result => {
            this.depotTnt = result.depotDetails;
            this.lgModalRef.show();
        },
            error => this.errorMessage = <any>error);
    }
}