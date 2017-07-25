import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable'
import {CachedDataService} from "./cached-data.service";

@Injectable()
export class DashboardService {

    private url = 'ws://localhost:3000';
    private socket;
    public observable;


    constructor(private http: Http, private cachedDataService : CachedDataService) {
        this.socket  = io('ws://localhost:3000');
        cachedDataService.socket = this.socket;
         this.observable = new Observable(observer => {
            this.socket.on('data', (data) => {
                console.log("RECEIVED DATA!!!!");
                observer.next(data);
            });
            return () => {
                // look into this;
                this.socket.disconnect();
            }
        });

    }

    public getDashboardMenuDetails() {
        return this.http.get('/applications', this.getOptionalParams());
    }

    public getApplicationMetrics(appPodReleamnName : string) {

        return this.http.get('/applications/metrics/' + appPodReleamnName);

    }


    private getOptionalParams() {
        const headers: Headers = new Headers({ 'Authorization': localStorage.getItem('authHeader') });
        return new RequestOptions({ headers: headers });
    }

    public fetchData() {
        return this.http.get('/fetchData', this.getOptionalParams());
    }


    public getAverageResponseTime() {

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

    public initSocket(requestData) {

        this.socket.emit('metrics', requestData);
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