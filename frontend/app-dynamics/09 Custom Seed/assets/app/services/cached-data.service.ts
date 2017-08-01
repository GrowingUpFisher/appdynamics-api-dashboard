import { Injectable } from '@angular/core';
import { UserAccount } from '../model/useraccount';
import {SocketData} from "../model/socket-data";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {DashboardService} from "./dashboard.service";
@Injectable()
export class CachedDataService {


    private userAccountDetails: {};


    public setUserAccountDetails(userAccountDetails) {
        this.userAccountDetails = userAccountDetails;
    }

    public getUserAccountDetails() {
        return this.userAccountDetails;

    }

    public socket;


   //public groupedArt : Observable<Array<any>> = Observable.create(() => []);

    public masterData = {}
    public channels = {};
    // store channel and graph state over here
    public sliderPosition = {}

    public heatMapData = [];


}