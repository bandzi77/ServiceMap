import { Component, OnInit } from '@angular/core';
import { apiUrl } from './environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Component({
    selector: 'sm-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['/app.component.css']
})
export class AppComponent implements OnInit {
    isSuperusers: boolean;
    errorMsg: string;

    constructor(private _http: Http) {
    };

    ngOnInit() {
        this.checkPermissions()
            .subscribe(
            data => this.isSuperusers = data,
            error => console.error(<any>error));
    }

    private checkPermissions(): Observable<boolean> {
        return this._http.get(apiUrl.getpermissions)
            .map(this.extractData)
            .do(this.logData)
            .catch(this.handleError);
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
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private logData(data: any) {
        console.log('All: ' + JSON.stringify(data));
    }
}
