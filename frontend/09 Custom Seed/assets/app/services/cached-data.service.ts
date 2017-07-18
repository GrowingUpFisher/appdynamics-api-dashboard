import { Injectable } from '@angular/core';
import { UserAccount } from '../model/useraccount';
@Injectable()
export class CachedDataService {

    private userAccountDetails: {};

    public setUserAccountDetails(userAccountDetails) {
        this.userAccountDetails = userAccountDetails;
    }

    public getUserAccountDetails() {
        return this.userAccountDetails;
    }

}