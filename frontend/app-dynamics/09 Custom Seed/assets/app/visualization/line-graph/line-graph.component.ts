import { Component, ElementRef, OnInit, OnChanges, Input } from '@angular/core';
import { MetricData } from '../../model/metric-data';
import { DashboardService } from '../../services/dashboard.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";


@Component({
    selector: 'app-line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.css']



})
export class LineGraphComponent implements OnInit, OnChanges {

    private data: MetricData[] = [];
    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    //private z: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;



    constructor(private dashboardService: DashboardService) {
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;



    }

    ngOnChanges() {

    }

    ngOnInit() {


        this.dashboardService.fetchData().subscribe((resp) => {

            //console.log(resp.json()["0"].metricValues);
            resp.json()["0"].metricValues.map(m => {
                let md = new MetricData();
                console.log(m.value);
                md.metricValue = m.value;
                md.timestamp = new Date(m.startTimeInMillis);

                this.data.push(md);

                if (this.data.length === resp.json()["0"].metricValues.length) {


                    this.initSvg();
                    this.initAxis();
                    this.drawAxis();
                    this.drawLine();
                    this.populate();
                }

            });

        });



    }

    private initSvg() {
        this.svg = d3.select("svg#lineGraph")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");



    }

    private initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        //this.z = d3Scale.scaleLinear().range([5, 20]);

        this.x.domain(d3Array.extent(this.data, (d) => d.timestamp));
        this.y.domain(d3Array.extent(this.data, (d) => d.metricValue));
        // this.z.domain(d3Array.extent(this.data, (d) => d.metricValue));
    }

    private drawAxis() {

        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));

        this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(this.y))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Response (seconds)");
    }

    private drawLine() {


        this.line = d3Shape.line()
            .curve(d3Shape.curveCatmullRom)
            .x((d: any) => this.x(d.timestamp))
            .y((d: any) => this.y(d.metricValue));

        this.svg.append("path")
            .datum(this.data)
            .attr("class", "line")
            .attr("d", this.line);


    }


    populate() {


        this.svg.selectAll('.dot')
            .data(this.data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('r', (d) => "2px")
            .attr('cx', (d) => this.x(d.timestamp))
            .attr('cy', (d) => this.y(d.metricValue))
            .style('fill', 'blue')
            .style('opacity', 0.9)
            .style('cursor', 'pointer')
            .on('mouseover', function (d) {
                console.log("Hello : " + d.metricValue);
            })
            .append('title')
            .text(d => 'Timestamp : ' + d.timestamp + ',' +
                'Metric Value: ' + d.metricValue);

    }






}