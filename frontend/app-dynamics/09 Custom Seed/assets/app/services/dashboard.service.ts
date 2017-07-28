import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable'
import {CachedDataService} from "./cached-data.service";
import {OverallAverageResponseTime} from "../model/overall-average-response-time";

@Injectable()
export class DashboardService {

    private url = 'ws://localhost:3000';
    private socket;
    public observable;


    constructor(private http: Http, private cachedDataService : CachedDataService) {
        this.socket  = io(this.url);

        cachedDataService.socket = this.socket;

         this.observable = new Observable(observer => {
            this.socket.on('data', (data) => {
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



    public initSocket(requestData) {
        // clear cached data service, because user selected a different pod, realm and app, do the same on server side too
        // everytime you receive a request for metrics, clear the server side caching too
        this.socket.emit('metrics', requestData);

    }




}