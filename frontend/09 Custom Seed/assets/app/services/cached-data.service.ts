import { Injectable } from '@angular/core';
import { UserAccount } from '../model/useraccount';
import {SocketData} from "../model/socket-data";
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
    public socketData : SocketData = new SocketData();

   // public groupedArt = [];



}