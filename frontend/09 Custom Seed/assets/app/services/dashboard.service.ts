import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class DashboardService {

    private url = 'ws://localhost:3000';
    private socket;

    constructor(private http: Http) { }

    public getDashboardMenuDetails() {
        return this.http.get('/applications', this.getOptionalParams());
    }

    public getApplicationMetrics(podName: string, realmName: string,
        appName: string, appId: string) {



    }

    private getBaseMetrics() {

    }

    private getOptionalParams() {
        const headers: Headers = new Headers({ 'Authorization': localStorage.getItem('authHeader') });
        return new RequestOptions({ headers: headers });
    }

    public fetchData() {
        return this.http.get('/fetchData', this.getOptionalParams());
    }


    public getAverageResponseTime() {
        this.socket = io('ws://localhost:3000');
        this.socket.emit('average response time', 'average response time');

        let observable = new Observable(observer => {
            this.socket.on('average response time reply', (data) => {

                observer.next(data);
            });
            return () => {
                // look into this;
                this.socket.disconnect();
            }
        });
        return observable;
    }




}