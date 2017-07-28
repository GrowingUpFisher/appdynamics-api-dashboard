/**
 * Created by dkandpal on 7/5/17.
 */
import { Component, OnInit } from '@angular/core';
import {MultipleLineSeriesData, MetaData} from '../../model/multiple-line-series-data'
import * as d3 from 'd3/index';
import {Meta} from "@angular/platform-browser";
@Component({
    selector: 'app-multiple-line-series',
    templateUrl: './multiple-time-series-graph.html',
    styleUrls: ['./multiple-time-series-graph.css']


})
export class MultipleLineSeriesComponent implements OnInit {

    private svg : any;
    private chartGroup : any;
    private width : number = 600;
    private height : number = 600;
    private margin = {left : 50, right : 50, top : 40, bottom : 0};
    private colorScale : any;
    private data : MultipleLineSeriesData[] = [];
    constructor() {

    }

    ngOnInit() {
        this.generateData();
        this.initSvg();
        this.initLine();

    }

    private initSvg() {

        this.svg = d3.select("div.multiple-time-series").append("svg")
            .attr("width", this.width + 200)
            .attr("height", this.height + 200);

        this.chartGroup = this.svg.append("g")
                .attr("class", "chartGroup")
                .attr("transform", "translate("+this.margin.left + "," + this.margin.top + ")");



    }


    private initLine() {

        var y = d3.scaleLinear()
            .domain([

                d3.min(this.data, (d) => {
                    return d3.min(d.metaData, (md) => md.metricValue);
                })
                , d3.max(this.data, (d) => {
                    return d3.max(d.metaData, (md) => md.metricValue);
                })])
            .range([this.height, 0]);


        var x = d3.scaleTime()
            .domain([
                d3.min(this.data, (d) => {
                    return d3.min(d.metaData, (md) => md.metricTimestamp);
                })

                , d3.max(this.data, (d) => {
                    return d3.max(d.metaData, (md) => md.metricTimestamp);
                })])
            .range([0, this.width]);

        this.chartGroup.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x));

        this.chartGroup.append("g")
            .attr("class", "axis y")
            .call(d3.axisLeft(y));

        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(this.data.map(m => m.type));


       var line = d3.line().curve(d3.curveBasis).x(d => d[0]).y(d => d[1]);



        let metrics = this.chartGroup.selectAll("g.metric").data(this.data)
            .enter()
            .append("g")
            .attr("class", "metric");

        metrics.append("path").attr("class", "line")
            .attr("d", (d) => {
                var finalArr = [];
                    for(var i =0; i< d.metaData.length; i++) {
                        var obj = d.metaData[i];
                        var objArr = [];
                        objArr.push(x(obj.metricTimestamp));
                        objArr.push(y(obj.metricValue));
                        finalArr.push(objArr);
                    }
               return line(finalArr);
            })
            .attr("stroke", (d) => this.colorScale(d.type))
            .attr("fill", "none");


    }

    private generateData() {
        let arr = ['ART', 'HeapSize', 'MemoryUsage'];
        let current = [1499270222623,1499260222623,1499250222623,1499240222623,1499230222623,1499220222623,1499210222623,1499200222623];
        for(var i =0; i < arr.length; i++) {
            let metric = new MultipleLineSeriesData();
            metric.type = arr[i];

            for(var p =0; p< 8; p++) {


                let newDate = new Date(current[p]);
                let metaData = new MetaData();

                metaData.metricValue = this.getRandomData();
                metaData.metricTimestamp = newDate;

                metric.metaData.push(metaData);

            }
            this.data.push(metric);
        }


    }

    private getRandomData() {
        return 100 + Math.floor(Math.random() * 500);
    }



}