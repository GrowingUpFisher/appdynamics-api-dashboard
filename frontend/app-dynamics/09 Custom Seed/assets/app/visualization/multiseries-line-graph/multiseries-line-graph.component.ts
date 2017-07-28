import { Component, ElementRef, OnInit, OnChanges, Input } from '@angular/core';
import { MetricData } from '../../model/metric-data';
import { DashboardService } from '../../services/dashboard.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Brush from 'd3-brush';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Time from 'd3-time';
import * as D3 from 'd3/index';
import {ScatterMetric} from '../../model/Scatter-data';

import {DataPoint, MetricType} from '../../model/multi-series-data';
import {timestamp} from "rxjs/operator/timestamp";
@Component({
    selector: 'app-multiseries-line-graph',
    templateUrl: './multiseries-line-graph.component.html',
    styleUrls: ['./multiseries-line-graph.component.css']



})
export class MultiSeriesLineComponent implements OnInit {
    //private inputData : MetricType[] = [new MetricType()];
    private data : ScatterMetric[] = [];


    constructor() {}

    ngOnInit() {
        this.plotScatter();
    }

    plotScatter() {

        var div = d3.select("div.tooltip");

        this.getData();

        console.log(this.data.length);
        var margin = {top: 20, right: 20, bottom: 110, left: 50},
            margin2 = {top: 430, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            height2 = 500 - margin2.top - margin2.bottom;

       // var parseDate = d3TimeFormat.timeParse("%b %Y").;


        var x = D3.scaleTime().range([0, width]),
            x2 = D3.scaleTime().range([0, width]),
            y = D3.scaleLinear().range([height, 0]),
            y2 = D3.scaleLinear().range([height2, 0]);

        var xAxis = D3.axisBottom(x),
            xAxis2 = D3.axisBottom(x2),
            yAxis = D3.axisLeft(y);

        var brush = D3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("brush", brushed);


        var svg = D3.select("div#multiseries").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);


        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);



        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


        x.domain(D3.extent(this.data, function(d) { return d.timestamp; }));
        y.domain([0, D3.max(this.data, function(d) { return d.metricValue; })+200]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        // var dots = focus.append("g");
        // dots.attr("clip-path", "url(#clip)");
        // dots.selectAll("dot")
        //     .data(this.data)
        //     .enter().append("circle")
        //     .attr('class', 'dot')
        //     .attr("r",5)
        //     .style("opacity", .5)
        //     .attr("cx", function(d) { return x(d.timestamp); })
        //     .attr("cy", function(d) { return y(d.metricValue); });



        // LINE DRAW
        var focusLine = d3Shape.line().curve(d3Shape.curveCatmullRom).x((d) => x(d[0])).y((d) => y(d[1]));

        var newArr2 = [];
        this.data.forEach(d => {
            var na = [d.timestamp.getMilliseconds(), d.metricValue];
            newArr2.push(na);

        });



        focus.append("path")
            .datum(newArr2)
            .attr("class", "line")
            .attr("d", focusLine)
            .attr('stroke', 'red');

        // LINE DRAW



        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        focus.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average Response Time (ms)");

        svg.append("text")
            .attr("transform",
                "translate(" + ((width + margin.right + margin.left)/2) + " ," +
                (height + margin.top + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Date");


        var dots = context.append("g");
        dots.attr("clip-path", "url(#clip)");
        dots.selectAll("dot")
            .data(this.data)
            .enter()
            .append("circle")
            .attr('class', 'dotContext')
            .attr("r",3)
            .style("opacity", .5)
            .attr("cx", function(d) { return x2(d.timestamp); })
            .attr("cy", function(d) { return y2(d.metricValue); });




        // LINE DRAW
        var contextLine = d3Shape.line().curve(d3Shape.curveCatmullRom).x((d) => x2(d[0])).y((d) => y2(d[1]));

        var newArr = [];
        this.data.forEach(d => {
            var na = [d.timestamp.getMilliseconds(), d.metricValue];
            newArr.push(na);

        });



        context.append("path")
            .datum(newArr)
            .attr("class", "line")
            .attr("d", contextLine)
            .attr('stroke', 'red');

        // LINE DRAW

        context.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);

        context.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.move, x.range());


        function brushed() {

            var selection = d3.event.selection;
            x.domain(selection.map(x2.invert, x2));

            focus.selectAll(".dot")
                .attr("cx", function(d : ScatterMetric) { return x(d.timestamp); })
                .attr("cy", function(d : ScatterMetric) { return y(d.metricValue); });

            var localFocusLine= d3Shape.line().curve(d3Shape.curveCatmullRom).x((d) => x(d[0])).y((d) => y(d[1]));

            focus.selectAll(".line").attr("d", localFocusLine);
            focus.select(".axis--x").call(xAxis);

        }




    }


     getData() {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //for(var y=1990; y <=2010; y++) {
        for(var m=1427870800000; m<=1459569600000; m= m + 86400000) {


            var metric = this.getRandom();
            var sp = new ScatterMetric();
            sp.timestamp = new Date(m);
            sp.metricValue = metric;
            this.data.push(sp);
        }
    //}



}


     getRandom() {
    return Math.floor(Math.random() * (300 - 100) + 100);
}










}