import { Injectable } from '@angular/core';
import { IServiceTnt, IServiceFilter, IServiceTntResult } from './serviceTnt';
import { IDepotDetails, IDepotDetailsFilter, IDepotDetailsResult } from './depotDetails';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServicesTntService {
    private _productUrl = 'api/servicesTnt/servicesTnt.json';
    private _serchServicesUrl = 'api/servicesTnt/GetServices';
    private _getDepotDetails = 'api/servicesTnt/GetDepotDetails';
    constructor(private _http: Http) {

    };

    //getServicesTnt(): Observable<IServiceTnt[]> {
    //    return this._http.get(this._productUrl)
    //        .map((response: Response) => <IServiceTnt[]>response.json())
    //        .do(data => console.log('All' + JSON.stringify(data)))
    //        .catch(this.handleError);
    //}

    getDepotDetails(depotFilter: IDepotDetailsFilter): Observable<IDepotDetailsResult> {
        let searchParams = new URLSearchParams();

        searchParams.set('depotCode', depotFilter.depotCode);

        return this._http.get(this._getDepotDetails, { search: searchParams })
            .map(this.extractData)
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    searchServicesTnt(serviceFilter: IServiceFilter): Observable<IServiceTntResult> {
        let searchParams = new URLSearchParams();
        let currentPage;
       
        searchParams.set('postCode', serviceFilter.postCode);
        searchParams.set('cityName', serviceFilter.cityName);
        searchParams.set('currentPage', ""+serviceFilter.currentPage);

        return this._http.get(this._serchServicesUrl, { search: searchParams })
            .map(this.extractData)
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Działa
    //private handleError(error: Response) {
    //    console.error(error);
    //    return Observable.throw(error.json().error || 'Server error');
    //}


    private extractData(response: Response) {
        let data = response.json();
        return data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}