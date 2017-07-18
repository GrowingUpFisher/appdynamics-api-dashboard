import { Component, ElementRef, OnInit, OnChanges } from '@angular/core';
import { MetricData } from '../model/metric-data';
import * as d3 from 'd3/index';
@Component({
    selector: 'app-viz',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.css']


})
export class VisualizationComponent implements OnInit {

    private data: MetricData[] = [];
    private scatterFlag : boolean = true;
    private barFlag : boolean = false;
    private lineFlag : boolean = false;
    private heatMapFlag : boolean = false;

    constructor(private _element: ElementRef) {



    }

    ngOnInit() {


    }

    onScatter() {

        this.lineFlag = false;
        this.scatterFlag = true;
        this.barFlag = false;
        this.heatMapFlag = false;

    }

    onBar() {

        this.lineFlag = false;
        this.scatterFlag = false;
        this.barFlag = true;
        this.heatMapFlag = false;
    }

    onLine() {

        this.lineFlag = true;
        this.scatterFlag = false;
        this.barFlag = false;
        this.heatMapFlag = false;
    }

    onHeatmap() {

        this.lineFlag = false;
        this.scatterFlag = false;
        this.barFlag = false;
        this.heatMapFlag = true;
    }





}