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

    p1 = new RegExp("%", 'g')
    p2 = new RegExp('\"', 'g');
    p3 = new RegExp(' ', 'g');
    p4  =new RegExp('[|]', 'g');
    p5 = new RegExp('[(]', 'g');
    p6 = new RegExp('[)]', 'g');
    p7 = new RegExp(',','g');



    cleanUrl(name) {
    const folderName = name
        .replace(this.p1, "%25")
        .replace(this.p7, "%20")
        .replace(this.p2, "%22")
        .replace(this.p3, "%20")
        .replace(this.p4, "%7C")
        .replace(this.p5, "%28")
        .replace(this.p6, "%29");
    return folderName;
}



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

    public getHeatMapData(queryData) {
        const path = this.cleanUrl(queryData.path.join('|'));
        console.log('Calling HTTP : ' +'/applications/metrics/'+queryData.application+'/heatmap?'+
            'path='+path+
            '&startDate='+queryData.startDate+'&endDate='+queryData.endDate);
        return this.http.get('/applications/metrics/'+queryData.application+'/heatmap?'+
            'path='+path+
            '&startDate='+queryData.startDate+'&endDate='+queryData.endDate);
    }


    private getOptionalParams() {
        const headers: Headers = new Headers({ 'Authorization': localStorage.getItem('authHeader') });
        return new RequestOptions({ headers: headers });
    }

    public initSocket(requestData) {
        // clear cached data service, because user selected a different pod, realm and app, do the same on server side too
        // everytime you receive a request for metrics, clear the server side caching too
        this.socket.emit('metrics', requestData);

    }




}