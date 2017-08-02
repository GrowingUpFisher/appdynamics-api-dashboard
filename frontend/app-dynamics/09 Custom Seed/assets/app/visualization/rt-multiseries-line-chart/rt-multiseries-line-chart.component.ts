/**
 * Created by dkandpal on 8/2/17.
 */
/**
 * Created by dkandpal on 7/10/17.
 */
import {Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy} from '@angular/core';
import {AverageResponseTime, OverallAverageResponseTime} from '../../model/overall-average-response-time';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as d3 from 'd3/index';
import {DashboardService} from "../../services/dashboard.service";
import {CachedDataService} from "../../services/cached-data.service";
import {CombinedMultipleLineSeriesData, MetaData, MultipleLineSeriesData} from "../../model/multiple-line-series-data";

@Component({
    selector: 'app-multi-rt-line-chart',
    templateUrl: './rt-multiseries-line-chart.component.html',
    styleUrls: ['./rt-multiseries-line-chart.component.css']
})
export class RtMultiseriesLineChart implements OnInit, OnChanges, OnDestroy {




    // @Input()
    // channelName : string;

    @Input()
    i;

    currentStart;
    currentEnd;

    private combinedMultiSeries : CombinedMultipleLineSeriesData = new CombinedMultipleLineSeriesData();//data : MultipleLineSeriesData[] = [];
    private colorScale : any;

    constructor(private dashboardService : DashboardService,
                private cachedDataService : CachedDataService) {

    }

    ngOnInit() {
        this.generateData();
        this.initLine();
    }

    ngOnChanges() {}

    ngOnDestroy() {}

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
        var divElement = d3.select("div#rt-multiseries-2").append("div").attr("class", "multi-class-"+this.i);
        divElement.append("h3").text('Multiple TS Graph');



        svg = divElement.append("svg").attr("class", "multi-class")
            .attr("width", width + 200)
            .attr("height", height + 200);

        chartGroup = svg.append("g")
            .attr("class", "chartGroup")



        var y = d3.scaleLinear()
            .domain([

                d3.min(this.combinedMultiSeries.data, (d) => {
                    return d3.min(d.metaData, (md) => md.metricValue);
                })
                , d3.max(this.combinedMultiSeries.data, (d) => {
                    return d3.max(d.metaData, (md) => md.metricValue);
                })])
            .range([height, 0]);




        var minTs = d3.min(this.combinedMultiSeries.data, (d) => {
            return d3.min(d.metaData, (md) => md.metricTimestamp);
        });
        var maxTs = d3.max(this.combinedMultiSeries.data,  (d) => {
            return d3.max(d.metaData, (md) => md.metricTimestamp);
        });


        var x = d3.scaleTime()
            .domain([
                d3.min(this.combinedMultiSeries.data, (d) => {
                    return d3.min(d.metaData, (md) => md.metricTimestamp);
                })

                , d3.max(this.combinedMultiSeries.data, (d) => {
                    return d3.max(d.metaData, (md) => md.metricTimestamp);
                })])
            .range([0, width]);

        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(this.combinedMultiSeries.data.map(m => m.type));


        // new add on start
        var x2 = d3.scaleTime().domain(x.domain()).range([0, width]);
        var y2 = d3.scaleLinear().domain(y.domain()).range([height2, 0]);

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

        chartGroup.selectAll("line.horizontalGrid").data(y.ticks()).enter()
            .append("line")
            .attr("class", "horizontalGrid")
            .attr("x1", 40)
            .attr("x2", width + 40)
            .attr("y1", function(d){ return y(d) + 21;})
            .attr("y2", function(d){ return y(d) + 21;})
            .attr("shape-rendering", "crispEdges")
            .attr("stroke", "black")
            .attr("stroke-width", "1px")
            .attr("opacity", "0.1");


        chartGroup.selectAll("line.verticalGrid").data(x.ticks()).enter()
            .append("line")
            .attr("class", "verticalGrid")
            .attr("x1", function(d) {return x(d) + 40})
            .attr("x2", function(d) {return x(d) + 40})
            .attr("y1", 20)
            .attr("y2", height + 20)
            .attr("shape-rendering", "crispEdges")
            .attr("stroke", "black")
            .attr("stroke-width", "1px")
            .attr("opacity", "0.1");





        var focus = chartGroup.append("g")
            .data(this.combinedMultiSeries.data)
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = chartGroup.append("g")
            .data(this.combinedMultiSeries.data)
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");




        // new add on end



        var line = d3.line().curve(d3.curveBasis).x(d => x(d[0])).y(d => y(d[1]));

        var finalArr = [];
        var colorScheme = ['red', 'green', 'blue'];
        for(var i=0; i<this.combinedMultiSeries.data.length; i++) {
                const singleSeries = this.combinedMultiSeries.data[i];
                const singleSeriesCordinates = [];
            for(var j=0; j< singleSeries.metaData.length; j++) {
                var obj = [];
                var temp = singleSeries.metaData[j];
                obj.push(temp.metricTimestamp);
                obj.push(temp.metricValue);
                singleSeriesCordinates.push(obj);
            }
            finalArr.push(singleSeriesCordinates);

        }


        for(var i=0; i< finalArr.length; i++) {
            console.log('i ' +i + ":" +finalArr[i]);
            focus.append("path").datum(finalArr[i])
                .attr("fill", "none")
                .attr("class", "area")
                .attr("stroke", colorScheme[i])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);

        }






        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate("+0 + ", " + height + ")")
            .call(xAxis);


        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);


      for(var i=0; i<finalArr.length; i++) {


          context.append("path").datum(finalArr[i])
              .attr("fill", "none")
              .attr("class", "area")
              .attr("stroke", colorScheme[i])
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("d", line2);


      }

        context.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);

        // context.append("g")
        //     .attr("class", "brush")
        //     .call(brush)
        //     .call(brush.move, x.range());
        //   console.log("x2 start : " + x2(this.currentStart));
        // console.log("x2(this.currentEnd) :  " + x2(this.currentEnd));

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

            focus.selectAll(".area").attr("d", line);

            // focus.selectAll("path").attr("d", (d) => {
            //     if(d != null) {
            //         console.log("d on focus: " + JSON.stringify(d));
            //         return line(d);
            //     }
            //
            // });
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));

            con.currentStart = x2.invert(s[0]);
            con.currentEnd = x2.invert(s[1]);



            chartGroup.selectAll("line.verticalGrid").remove();

            chartGroup.selectAll("line.verticalGrid").data(x.ticks()).enter()
                .append("line")
                .attr("class", "verticalGrid")
                .attr("x1", function(d) {return x(d) + 40})
                .attr("x2", function(d) {return x(d) + 40})
                .attr("y1", 20)
                .attr("y2", height + 20)
                .attr("shape-rendering", "crispEdges")
                .attr("stroke", "black")
                .attr("stroke-width", "1px")
                .attr("opacity", "0.1");




        }

        function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush

            var t = d3.event.transform;
            //   console.log("Called zoom : " + t);
            x.domain(t.rescaleX(x2).domain());

            focus.selectAll(".area").attr("d", line);

            // focus.selectAll("path").attr("d", (d) => {
            //     if(d != null) {
            //         console.log("d on focus: " + JSON.stringify(d));
            //         return line(d);
            //     }
            // });

            focus.select(".axis--x").call(xAxis);

            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }



    }

    private generateData() {
        let arr = ['ART', 'HeapSize', 'MemoryUsage'];
        const tempArr = [];
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
            tempArr.push(metric);
        }

        this.combinedMultiSeries.data = tempArr;




    }

    private getRandomData() {
        return 100 + Math.floor(Math.random() * 500);
    }


}