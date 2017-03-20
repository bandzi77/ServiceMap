import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser, IUserFilter,IUserResult } from './user';

@Injectable()
export class UserService {
    private baseUrl = 'api/users';

    constructor(private http: Http) { }

    getUsers(userFilter: IUserFilter): Observable<IUserResult> {
        let searchParams = new URLSearchParams();
        searchParams.set('email', userFilter.email);
        searchParams.set('showLockedOnly', String(userFilter.showLockedOnly));
      
        return this.http.get(this.baseUrl, { search: searchParams })
            .map(this._extractData)
            .do(data => console.log('getUsers' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    getUser(user: IUser): Observable<IUser> {
        if (user._id==="0") {
            return Observable.of(this.initializeUser());
            // return Observable.create((observer: any) => {
            //     observer.next(this.initializeProduct());
            //     observer.complete();
            // });
        };
        return Observable.of(user);
    }

    deleteUser(_id: string): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${_id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteUser: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    saveUser(user: IUser): Observable<IUser> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (user._id === "0") {
            return this._addUser(user, options);
        }
        return this._updateUser(user, options);
    }

    private _addUser(user: IUser, options: RequestOptions): Observable<IUser> {
        return this.http.post(this.baseUrl, user, options)
            .map(this._extractData)
            .do(data => console.log('addUser: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    private _updateUser(user: IUser, options: RequestOptions): Observable<IUser> {
        const url = `${this.baseUrl}/${user._id}`;
        return this.http.put(url, user, options)
            .map(() => user)
            .do(data => console.log('updateUser: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    private _extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    private _handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeUser(): IUser {
        // Return an initialized object
        return {
            _id: "0",
            email: null,
            password:null,
            limitOfRequestsPerDay: null,
            numberOfRequestsPerDay: null,
            isSuperUser:false,
            isLocked: false
        };
    }
}
