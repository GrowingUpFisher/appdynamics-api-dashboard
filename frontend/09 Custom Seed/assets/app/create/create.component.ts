/**
 * Created by dkandpal on 7/23/17.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from "../services/dashboard.service";
import {} from ''
@Component({
    selector: 'app-create-dashboard',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent {

    createMetricForm: FormGroup;
    graphTypes = ['line-graph', 'bar-graph', 'scatter-plot', 'heat-map', 'donut-chart'];
    private nodes = [];
    private selectedPath = '';
    @ViewChild('tree') tree: any;

    constructor(private fb: FormBuilder, private dashboardService : DashboardService) {
        this.createForm();
        this.getAllApplicableMetrics();
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
        console.log('1 :' + $event);
        console.log('2:' + $event.node);
        const clickedNode = $event.node;
        if(clickedNode.isLeaf) {
            this.buildPath(clickedNode.data.name, clickedNode.parent);
            console.log('Selected Path : ' + this.selectedPath);
        } else {
            this.selectedPath = '';
        }

    }


    buildPath(currentPath, node) {
        console.log('node.isRoot : ' + node.isRoot);
            if(typeof node.isRoot !== 'undefined') {
                console.log('Sending full path : ' + currentPath + "|$|" + node.data.name);
                this.selectedPath = currentPath + "|$|" + node.data.name;
                return currentPath + "|$|" + node.data.name;
            } else {
                console.log('sending partial path since root not reached : ' + currentPath + "|$|" + node.data.name);
                this.buildPath(currentPath + "|$|" + node.data.name, node.parent);
            }
    }

    filterNodes(filt, t2) {
        this.tree.treeModel.filterNodes(filt, true);
    }

}