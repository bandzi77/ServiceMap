import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { apiUrl } from './environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from './shared/toastr.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
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

    busyIndicator: Subscription;
    currentUser: ICurrentUser = {
        isSuperUser: undefined,
        userEmail: null
    };
    errorMsg: string;

    constructor(private _http: Http,
        private location: Location,
        private toastr: ToastsManager,
        vcr: ViewContainerRef,
        private toastService: ToastrService) {
        this.toastr.setRootViewContainerRef(vcr);
    };

    ngOnInit() {
        this.busyIndicator = this.checkPermissions()
            .subscribe(
            result =>
                this.currentUser = result,
            error =>   null  // TODO dorobiæ obs³ugê  console.error(<any>error)            
        );
    }

    private checkPermissions(): Observable<ICurrentUser> {
        return this._http.get(apiUrl.getpermissions)
            .map(this._extractData)
            .do(this._logData)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // TODO remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        if (/localhost/.test(document.location.host)) {
            console.log(errMsg);
            return Observable.throw(errMsg);
        }
        else {
            return Observable.throw("Wyst¹pi³ b³¹d");
        }
    }

    private _extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private _logData(data: any) {
        if (/localhost/.test(document.location.host)) {
            console.log('All: ' + JSON.stringify(data));
        }
    }
}

interface ICurrentUser {
    isSuperUser: boolean;
    userEmail: string;
}

