import { Injectable } from '@angular/core';
import { IServiceTnt } from './serviceTnt';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServicesTntService {
    private _productUrl = 'api/servicesTnt/servicesTnt.json';
    constructor(private _http: Http) {

    };

    getServicesTnt(): Observable<IServiceTnt[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IServiceTnt[]>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    searchServicesTnt(serviceFilter:any): Observable<IServiceTnt[]> {

        let searchParams = new URLSearchParams();
        for (let param in serviceFilter) {
            searchParams.set(param, serviceFilter[param]);
        }

        let options = new RequestOptions({
            search: searchParams
        });

        return this._http.get(this._productUrl, options )
            .map((response: Response) => <IServiceTnt[]>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}