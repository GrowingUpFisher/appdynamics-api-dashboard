import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {

    constructor(private http: Http) {


    }

    public authenticateExistingUser(account: string, username: string
        , password: string) {

        // let headers: Headers = new Headers({ 'Authorization': 'Basic ' + username + "@" + account + ":" + password });
        let headers: Headers = new Headers({ 'Authorization': 'Basic ' + btoa(username + "@" + account + ":" + password) });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/login', options);

    }


}