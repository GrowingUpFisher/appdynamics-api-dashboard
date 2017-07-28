/**
 * Created by dkandpal on 7/23/17.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from "../services/dashboard.service";
import {} from ''
import {CachedDataService} from "../services/cached-data.service";
@Component({
    selector: 'app-create-dashboard',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent {

    createMetricForm: FormGroup;
    graphTypes = ['line-graph' , 'heat-map', 'bar-graph', 'scatter-plot', 'donut-chart'];
    lineTypes = ['single-series', 'multi-series'];
    private nodes = [];
    private selectedPath = '';
    private selectedEntry;
    private lineGraph = false;
    private heatMap = false;
    @ViewChild('tree') tree: any;

    constructor(private fb: FormBuilder, private dashboardService : DashboardService,
                private cachedDataService : CachedDataService,
                private route: ActivatedRoute,
                private router: Router) {
        this.createForm();
        this.getAllApplicableMetrics();
        this.onSelectionChange(this.graphTypes[0]);
    }

    createForm() {
        this.createMetricForm = this.fb.group({
            metricType : ['', Validators.required],
            metricName : ['', Validators.required]
        });
    }

    getAllApplicableMetrics() {
        this.dashboardService.getApplicationMetrics('aacd_prd_POD30').subscribe( s => {
            this.nodes = s.json();
        });
    }


    onEvent = ($event) => {

        const clickedNode = $event.node;
        if(clickedNode.isLeaf) {
            this.buildPath(clickedNode.data.name, clickedNode.parent);

        } else {
            this.selectedPath = '';
        }

    }


    buildPath(currentPath, node) {
        console.log('node.isRoot : ' + node.isRoot);
            if(typeof node.isRoot !== 'undefined') {

                this.selectedPath = currentPath + "  |  " + node.data.name;

                return currentPath + "  |  " + node.data.name;
            } else {

                this.buildPath(currentPath + "  |  " + node.data.name, node.parent);
            }
    }

    filterNodes(filt, t2) {
        this.tree.treeModel.filterNodes(filt, true);
    }

    addViz() {
        this.cachedDataService.socket.emit('metrics', {
            application : 'aaqx_prd_POD24',
            path : ["Overall Application Performance", "Average Response Time"],
            channelName : this.selectedPath
        });
        this.cachedDataService.channels[this.selectedPath] = 'single-line-graph';
        this.router.navigate(['../view'], {relativeTo : this.route});

    }

    onSelectionChange(entry) {
        if(entry === 'line-graph') {
            this.lineGraph = true;
            this.heatMap = false;
         } else if(entry === 'heat-map') {
            this.lineGraph = false;
            this.heatMap = true;
        } else {
            this.lineGraph = false;
            this.heatMap = false;
        }

        this.selectedEntry = entry;
    }

    onLine(entry) {

    }




}