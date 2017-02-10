import { Injectable } from '@angular/core';
import { IServiceTnt, IServiceFilter, IServiceTntResult } from './serviceTnt';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServicesTntService {
    private _productUrl = 'api/servicesTnt/servicesTnt.json';
    private _serchServicesUrl = 'api/servicesTnt';
    constructor(private _http: Http) {

    };

    getServicesTnt(): Observable<IServiceTnt[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IServiceTnt[]>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    searchServicesTnt(serviceFilter: IServiceFilter): Observable<IServiceTntResult> {
        let searchParams = new URLSearchParams();
        let currentPage;
        if (serviceFilter.currentPage === null || serviceFilter.currentPage === undefined ) {
            currentPage = null;
        }
        else
        {
            currentPage = serviceFilter.currentPage.toString();
        }


       
        searchParams.set('postCode', serviceFilter.postCode);
        searchParams.set('cityName', serviceFilter.cityName);
        searchParams.set('currentPage', currentPage);
       
        return this._http.get(this._serchServicesUrl, { search: searchParams })
            .map((response: Response) => <IServiceTntResult>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}