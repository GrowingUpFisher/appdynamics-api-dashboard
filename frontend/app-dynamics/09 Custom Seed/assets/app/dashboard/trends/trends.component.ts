/**
 * Created by dkandpal on 6/26/17.
 */
import { Component , OnInit} from '@angular/core';
import {CachedDataService} from "../../services/cached-data.service";

@Component({

    selector: 'app-dashboard-trends',
    templateUrl: './trends.component.html',
    styleUrls: ['./trends.component.css']

})
export class TrendsComponent implements OnInit {

    private heatmapData = [];

    constructor(private cachedDataService : CachedDataService) {

    }

    ngOnInit() {
        this.heatmapData = this.cachedDataService.heatMapData;
    }

}