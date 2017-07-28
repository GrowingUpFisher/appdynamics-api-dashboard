import { Component, OnInit } from '@angular/core';
import { CachedDataService } from '../services/cached-data.service';
import { DashboardService } from '../services/dashboard.service';
import { Application } from '../model/application';
import { Router, ActivatedRoute } from '@angular/router';
import {AverageResponseTime, OverallAverageResponseTime} from '../model/overall-average-response-time';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

    private applicationArr: Application[] = [];
    private podRealmAppObj = {};
    private selectedPod: string = "";
    private selectedRealm: string = "";
    private selectedApp: string = "";
    private podArr = [];
    private realmArr = [];
    private appArr = [];


    //private data : OverallAverageResponseTime[] = [];
    //private art : AverageResponseTime = new AverageResponseTime() ;
    //public groupedArt = [];

    constructor(private cachedDataService: CachedDataService,
                private dashboardService: DashboardService,
                private route: ActivatedRoute,
                private router: Router) {

        this.loadDashboardDetails();

        //this.router.navigate(['/dashboard/standalone/config/' + this.selectedPod + "_" + this.selectedRealm + "_" + this.selectedApp]);
    }


    loadDashboardDetails() {
        this.dashboardService
            .getDashboardMenuDetails()
            .subscribe((response) => {

                JSON.parse(response.json().body).map((item) => {
                    const app = item;
                    this.applicationArr.push(app);
                });
                this.preapareApplicationMenuItems();
              //  console.log("this.podRealmAppObj: " + JSON.stringify(this.podRealmAppObj));

                this.podArr = Object.getOwnPropertyNames(this.podRealmAppObj);
            }, (error) => {
                console.log("Error While retrieving Application Data : " + error);
            });
    }

    preapareApplicationMenuItems() {
        this.applicationArr.map((app) => {
            const appDetailArr = app.name.split("_");
            if (appDetailArr.length === 3) {

                const appName = appDetailArr[0];
                const realmName = appDetailArr[1];
                const podName = appDetailArr[2];
                if (this.podRealmAppObj.hasOwnProperty(podName)) {
                    // existing pod
                    const realmObjs = this.podRealmAppObj[podName];
                    if (realmObjs.hasOwnProperty(realmName)) {
                        // existing realm
                        const appObjs = realmObjs[realmName];
                        appObjs[appName] = app.id;
                    } else {
                        // new realm
                        const appObjs = {};
                        appObjs[appName] = app.id;
                        realmObjs[realmName] = appObjs;

                    }
                } else {
                    // new pod
                    const appObjs = {};
                    appObjs[appName] = app.id;
                    const realmObjs = {};
                    realmObjs[realmName] = appObjs;
                    this.podRealmAppObj[podName] = realmObjs;
                }

            } else {
                console.error("Error with app : " + app.name);
            }

        });
    }

    onPodSelect(podName: string) {
        if (podName === "Select") {
            this.selectedRealm = "Select";
            this.selectedApp = "Select";
            this.realmArr = ['Select'];
            this.appArr = ['Select'];
        } else {
            const relevantRealms = this.podRealmAppObj[podName];
            this.realmArr = Object.getOwnPropertyNames(relevantRealms);
            this.appArr = ['Select'];
            this.selectedRealm = 'Select';
            this.selectedApp = 'Select';

        }

    }

    onRealmSelect(realmName: string) {
        if (realmName === "Select") {
            this.selectedApp = "Select";
            this.selectedApp = 'Select';
            this.appArr = ['Select'];
        } else {
            const relevantRealms = this.podRealmAppObj[this.selectedPod];
            console.log("relevantRealms : " + JSON.stringify(relevantRealms));
            const relevantApps = relevantRealms[realmName];
            this.selectedApp = 'Select';
            this.appArr = Object.getOwnPropertyNames(relevantApps);
        }

    }

    onSubmit() {
        this.initNewSocket();
        this.router.navigate([this.selectedPod + "_" + this.selectedRealm + "_" + this.selectedApp], {relativeTo : this.route});

    }

    initNewSocket() {
        this.cachedDataService.channels['Average Response Time  |  Overall Application Performance'] = 'single-line-graph';
        this.dashboardService.initSocket({
            application : 'aaqx_prd_POD24',
            path : ["Overall Application Performance", "Average Response Time"],
            channelName : "Average Response Time  |  Overall Application Performance"
        });
    }






}