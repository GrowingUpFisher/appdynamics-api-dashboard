/**
 * Created by dkandpal on 7/10/17.
 */
import {Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import {AverageResponseTime, OverallAverageResponseTime} from '../../model/overall-average-response-time';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as d3 from 'd3/index';

@Component({
    selector: 'app-rt-line-chart',
    templateUrl: './rt-line-chart.component.html',
    styleUrls: ['./rt-line-chart.component.css']
})
export class RTLineChart implements OnInit, OnChanges {


    @Input()
    art : AverageResponseTime;
    @Input()
    metricName : string;
    @Input()
        i;
    currentStart;
    currentEnd;



    constructor() {}

    ngOnInit() {

    }

    ngOnChanges(changes : SimpleChanges) {

        if(changes['art']) {
            this.initLine();
        }




    }



    private initLine() {

        var svg : any;
        var chartGroup : any;



        var margin = {top: 20, right: 20, bottom: 110, left: 40};
        var margin2 = {top: 430, right: 20, bottom: 30, left: 40};
        var width : number = 960 - margin.left - margin.right;
        var height : number = 500 - margin.top - margin.bottom;
        var height2 = 500 - margin2.top - margin2.bottom;

        d3.select("div.multi-class-"+this.i).remove();
        // d3.select("svg.multi-class").remove();
        var divElement = d3.select("div#rt-multiseries").append("div").attr("class", "multi-class-"+this.i);
        divElement.append("h3").text(this.metricName);

        svg = divElement.append("svg").attr("class", "multi-class")
            .attr("width", width + 200)
            .attr("height", height + 200);

        // svg = d3.select("div#rt-multiseries").append("svg").attr("class", "multi-class")
        //     .attr("width", width + 200)
        //     .attr("height", height + 200);

        chartGroup = svg.append("g")
            .attr("class", "chartGroup")


        var y = d3.scaleLinear()
            .domain([d3.min(this.art.data, (d) => d.value), d3.max(this.art.data, (d) => d.value)])
            .range([height, 0]);

        var minTs = d3.min(this.art.data, (d) => d.timestamp);
        var maxTs = d3.max(this.art.data, (d) => d.timestamp);

        var x = d3.scaleTime()
            .domain([
                minTs
                , maxTs])
            .range([0, width]);


        // new add on start
        var x2 = d3.scaleTime().domain(x.domain()).range([0, width]);
        var y2 = d3.scaleLinear().domain(y.domain()).range([height2, 0]);

        // new add on end

        if(!this.currentStart) {
        //    console.log("CURRENT START NOT DEFINED : " + this.art.data.length);
            this.currentStart = minTs;
        } else {
           // console.log("CURRENT START DEFINED : " + this.currentStart);
        }
        if(!this.currentEnd) {
         //   console.log("CURRENT END NOT DEFINED : " + maxTs);
            this.currentEnd = maxTs;
        } else {
         //   console.log("CURRENT END DEFINED : " + this.currentEnd);
        }

        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);


        // new add on start

        var xAxis2 = d3.axisBottom(x2);

        var brush = d3.brushX().extent([[0,0], [width, height2]]).on('brush end', () => brushed(this));



        var zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);
        var line2 = d3.line().curve(d3.curveBasis).x(d => x2(d[0])).y(d => y2(d[1]));

        chartGroup.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var focus = chartGroup.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = chartGroup.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


        // new add on end



        var line = d3.line().curve(d3.curveBasis).x(d => x(d[0])).y(d => y(d[1]));

        var finalArr = [];
        for(var i =0; i< this.art.data.length; i++) {
            var obj = [];
            var temp = this.art.data[i];
            obj.push(temp.timestamp);
            obj.push(temp.value);
            finalArr.push(obj);
        }
        focus.append("path").datum(finalArr)
            .attr("fill", "none")
            .attr("class", "area")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate("+0 + ", " + height + ")")
            .call(xAxis);


        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);


        context.append("path").datum(finalArr)
            .attr("fill", "none")
            .attr("class", "area")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line2);

        context.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);

        // context.append("g")
        //     .attr("class", "brush")
        //     .call(brush)
        //     .call(brush.move, x.range());
        console.log("x2 start : " + x2(this.currentStart));
        console.log("x2(this.currentEnd) :  " + x2(this.currentEnd));
        if(this.currentStart && this.currentEnd) {
            context.append("g")
                .attr("class", "brush")
                .call(brush)
                .call(brush.move, [x2(this.currentStart),x2(this.currentEnd)]);
        }

        chartGroup.append("rect")
            .attr("class", "zoom")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoom);



        function brushed(con) {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            // this.currentStart = x2.invert(s[0]);
            // this.currentEnd = x2.invert(s[1]);



            x.domain(s.map(x2.invert, x2));
            focus.select(".area").attr("d", line);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));

            con.currentStart = x2.invert(s[0]);
            con.currentEnd = x2.invert(s[1]);
        }

        function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush

            var t = d3.event.transform;
            console.log("Called zoom : " + t);
            x.domain(t.rescaleX(x2).domain());
            focus.select(".area").attr("d", line);
            focus.select(".axis--x").call(xAxis);

            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }


    }


    update(start, end) {
        this.currentStart = start;
        this.currentEnd = end;
    }









}