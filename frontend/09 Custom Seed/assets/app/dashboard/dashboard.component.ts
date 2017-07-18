import { Component, OnInit } from '@angular/core';
import { CachedDataService } from '../services/cached-data.service';
import { DashboardService } from '../services/dashboard.service';
import { Application } from '../model/application';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    private applicationArr: Application[] = [];
    private podRealmAppObj = {};
    private selectedPod: string = "";
    private selectedRealm: string = "";
    private selectedApp: string = "";
    private podArr = [];
    private realmArr = [];
    private appArr = [];

    constructor(private cachedDataService: CachedDataService,
                private dashboardService: DashboardService,
                private route: ActivatedRoute,
                private router: Router) {


    }

    ngOnInit() {
        this.router.navigate(['/dashboard/standalone']);

    }




    onStandaloneClick() {
        this.router.navigate(['/dashboard/standalone']);
    }

    onCompareClick() {

        this.router.navigate(['/dashboard/compare']);
    }

    onTrendClick() {
        this.router.navigate(['/dashboard/trends']);
    }




}