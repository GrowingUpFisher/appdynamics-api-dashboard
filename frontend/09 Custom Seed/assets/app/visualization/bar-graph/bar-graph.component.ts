import { Component, ElementRef, OnInit, OnChanges } from '@angular/core';
import { MetricData } from '../../model/metric-data';
import * as d3 from 'd3/index';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { DashboardService } from '../../services/dashboard.service';/**/
@Component({
    selector: 'app-dashboard-bar-graph',
    templateUrl: './bar-graph.component.html',
    styleUrls: ['./bar-graph.component.css'],
    providers: [DashboardService]


})
export class BarGraphComponent  {
    private data : MetricData[]=[];

    private margin = {
        top: 50,
        bottom: 50,
        left: 80,
        right: 40
    };


    private svg : any;
    private chart : any;
    private yGridLines : any;

    constructor(private dashboardService: DashboardService) {


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


                    this.drawRect();

                }

            });

        });

    }




    private initSvg() {
        this.svg = d3.select("svg#barGraph")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");



    }




    private drawRect() {
        var width = 800 - this.margin.left - this.margin.right;
        var height = 500 - this.margin.top - this.margin.bottom;
        var x = d3Scale.scaleTime().domain(d3Array.extent(this.data, (d) => d.timestamp)).range([0, width]);
        var y = d3Scale.scaleLinear().domain(d3Array.extent(this.data, (d ) => d.metricValue)).range([height, 0 ]);


        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3Axis.axisBottom(x));

        this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(y))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-4em")
            .style("text-anchor", "end")
            .text("Response (seconds)");

        this.svg.selectAll(".bar")
            .data(this.data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", function(d, i) {
                console.log("x :" + typeof this.x);
                return x(d.timestamp);
            })
            .attr("y", function(d, i) {
                return y(d.metricValue);
            })
            .attr("height", function(d, i) {
                return height - y(d.metricValue);
            })
            .attr("width", function(d) {
                return 20;
            })
            .attr('fill', function(d) {
                const metricValue = d.metricValue;
                if(metricValue <250 ) {
                    return 'green';
                } else if(metricValue < 450){
                    return 'orange';
                } else {
                    return 'red';
                }
            });

        // this.svg.selectAll(".bar-label")
        //     .data(this.data)
        //     .enter()
        //     .append("text")
        //     .classed("bar-label", true)
        //     .attr("x", function(d, i) {
        //         return x(d.timestamp) + 10;
        //     })
        //     .attr("dx", 0)
        //     .attr("y", function(d, i) {
        //         return y(d.metricValue);
        //     })
        //     .attr("dy", -6)
        //     .text(function(d) {
        //         return d.metricValue;
        //     });


    }





    plot() {

        // this.svg.append("g")
        //     .call(this.yGridLines)
        //     .classed("gridline", true)
        //     .attr("transform", "translate(0,0)")

        this.chart.selectAll(".bar")
            .data(this.data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", function(d, i) {
                return this.x(d.timestamp);
            })
            .attr("y", function(d, i) {
                return this.y(d.metricValue);
            })
            .attr("height", function(d, i) {
                return this.height - d.metricValue;
            })
            .attr("width", function(d) {
                return 20;
            })
            .style("fill", function(d) {
                if(d.metricValue < 300) {
                    return 'green';
                } else if(d.metricValue < 500) {
                    return 'orange';
                } else {
                    return 'red';
                }
            });
        //
        // this.chart.selectAll(".bar-label")
        //     .data(this.data)
        //     .enter()
        //     .append("text")
        //     .classed("bar-label", true)
        //     .attr("x", function(d, i) {
        //         return this.x(d.timestamp) + 10;
        //     })
        //     .attr("dx", 0)
        //     .attr("y", function(d, i) {
        //         return this.y(d.metricValue);
        //     })
        //     .attr("dy", -6)
        //     .text(function(d) {
        //         return d.metricValue;
        //     });
        //
        // this.chart.append("g")
        //     .classed("x axis", true)
        //     .attr("transform", "translate("+ 0 + "," + this.height + ")")
        //     .call(this.xAxis)
        //     .selectAll("text")
        //     .style("text-anchor", "end")
        //     .attr("dx", -8)
        //     .attr("dy", 8)
        //     .attr("transform", "translate(0,0) rotate(-45)");
        //
        // this.chart.append("g")
        //     .classed("y axis", true)
        //     .attr("transform", "translate(0,0)")
        //     .call(this.yAxis);
        //
        // this.chart.select(".y.axis")
        //     .append("text")
        //     .attr("x", 0)
        //     .attr("y", 0)
        //     .style("text-anchor", "middle")
        //     .attr("transform", "translate(-50," + this.height/2 + ") rotate(-90)")
        //     .text("Response Time");
        //
        // this.chart.select(".x.axis")
        //     .append("text")
        //     .attr("x", 0)
        //     .attr("y", 0)
        //     .style("text-anchor", "middle")
        //     .attr("transform", "translate(" + this.width/2 + ",80)")
        //     .text("Timestamp");
    }





}