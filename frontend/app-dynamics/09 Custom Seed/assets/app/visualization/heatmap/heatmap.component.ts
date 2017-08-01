import { Component, ElementRef, OnInit, OnChanges, Input } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as D3 from "d3/index";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Colors from 'd3-interpolate';

import {Day, Hour} from '../../model/testData';
import {color} from "d3-color";


@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.css'],




})
export class HeatMapComponent implements OnInit {
    private data : Day[] = [];
    private initData : Day[] = [];
    private dayNumberMapping = {};
    private hourData = [];
    private margin = { top: 50, right: 20, bottom: 50, left: 100 };
    private width = 1200 - this.margin.left - this.margin.right;
    private height = 400 - this.margin.top - this.margin.bottom;
    private gridSize = Math.floor(this.width / 24);
    private legendElementWidth = this.gridSize*2;
    private buckets = 9;
    private colors = [100,200,300,400,500,600,700,800,900];
    //private days = ["June 20", "June 21", "June 22", "June 23", "June 24"];
    private days = [];
    private times = ['0', "1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    //private artyom = Artyom.ArtyomBuilder.getInstance();

    @Input()
    queryData;

    ngOnInit() {

        this.dashboardService.getHeatMapData(this.queryData).subscribe((response) => {

            //this.prepareData();
            console.log("out :" + JSON.stringify(response.json().data));
            this.prepareNewData(response.json());
            this.initSvg();
        });


    }

    prepareNewData(response) {
        let counter = 0;
        const data = response.data;
        for(var yearMonDateKey in data) {


            for(var i=0; i< 24; i++) {
                const day = new Day();
                day.hourName = i;
                day.dayName = counter;
                day.value = 0;
                this.data.push(day);
            }


            this.dayNumberMapping[counter] = yearMonDateKey;
            this.days.push(yearMonDateKey);
            const hours = data[yearMonDateKey].hour;
            for(var hourKey in hours) {

                const day = this.data.find((day) => {return day.dayName === counter && day.hourName === parseInt(hourKey);});
                //const day = new Day();
                day.dayName = counter;
                day.hourName = parseInt(hourKey);
                day.value = hours[hourKey].average;
                //this.data.push(day);
            }
            counter++;
        }

    }

    constructor(private dashboardService : DashboardService) {

    }

    startArtyom() {

        //
        // this.artyom.initialize({
        //     lang : 'en-GB',
        //     continuous : true,
        //     debug : true,
        //     listen  : true
        // });
        //
        // this.artyom.addCommands({
        //     description: 'Test hello talk',
        //
        //     indexes: ['what is the minimum average response time', 'commerce cloud'],
        //     action: (i) => {
        //         if(i ===0) {
        //             this.artyom.say("The minimum average response time was 130 milliseconds on June 22nd at one pm");
        //             console.log('Hello recognized');
        //         } else {
        //             this.artyom.say("Its Anthony , oops sorry I meant Diana");
        //             console.log('Hey recognized');
        //         }
        //
        //     }
        // });




    }

    stopArtyom() {
      //  this.artyom.fatality();
    }


    initSvg() {

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var svg = d3.select("#chart").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        // check for how to sort
        var dayLabel = svg.selectAll(".dayLabel")
            .data(this.days)
            .enter().append("text")
            .text(function(d) { return d})
            .attr("x", 0)
            .attr("y", (d,i) => i * this.gridSize)
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + this.gridSize / 1.5 + ")");


        var timeLabel = svg.selectAll(".timeLabel")
            .data(this.times)
            .enter().append("text")
            .text(function(d) {
                if(Number(d) <12)
                    return d + " am";
                else if(Number(d) === 12)
                    return d + " pm"
                else
                    return (Number(d) - 12) + " pm";
 })
            .attr("x", (d, i) =>  i * this.gridSize)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + this.gridSize / 2 + ", -6)");

        var colorScale = d3Scale.scaleQuantile()
            .domain([0, this.buckets - 1, 600])
            .range(this.colors);



            var cards = svg.selectAll(".hour")
            .data(this.data, function(d : Day) {
                    return d.dayName + ":"+ d.hourName;
            });
            cards.append("title");

            cards.enter()
            .append("rect").on('click', (d) => {
                    this.onTileClick(d.dayName, d.hourName - 1, d.value);

                })
                .on('mouseover', (d) => {

                    div.transition().duration(200).style("opacity", .9);
                    div.html(d.value + "(ms)")
                    .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 18) + "px");
                })
                .on('mouseout', (d) => {
                    div.transition().duration(500).style("opacity", 0);
                })
            .attr("x", (d : Day) => (d.hourName) * this.gridSize)
            .attr("y", (d : Day) => (d.dayName) * this.gridSize)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", this.gridSize)
            .attr("height", this.gridSize)
            .style("fill", '#ffebee')
                .transition()
            .duration(3000)
            .style("fill", (d : Day) => {
                if(d.value === 0)
                    return "#ffebee";
            else if(d.value < 325)
                return "#c8e6c9";
            else if(d.value < 355) {
                return "#fff59d";
            } else if(d.value < 370) {
                return "#ffa726";

            } else {
                return "#ff5722";

            }
        });










    // cards.on('click', (d) => {
    //         console.log("d : " + d.value);
    //         console.log("d : " + d.dayName);
    //         console.log("d : " + d.hourName);
    //         this.onTileClick(d.dayName, d.hourName, d.value);
    //
    //     }
    // );

        // cards.transition().duration(1000)
        //     .style("fill", function(d) { return colorScale(d.value); });

        cards.select("title").text(function(d) { return d.value; });

        cards.exit().remove();

        var legendColors  = [ '#ff5722', '#ffa726','#fff59d', '#c8e6c9'];

        var values = [500, 400, 300, 200];

        var legend = svg.selectAll(".legend").data(legendColors, (d,i) => legendColors[i]);


        var p = legend.enter().append("g")
            .attr("class", "legend");



        p.append("rect")
            .attr("x", (d, i) => { return this.legendElementWidth * i; })
            .attr("y", 280)
            .attr("width", this.legendElementWidth)
            .attr("height", this.gridSize/2)
            .style("fill", function(d, i) { return legendColors[i]; });

        p.append("text")
            .attr("class", "mono")
            .text((d,i) => {  return ">" + values[i] + "ms"; })
            .attr("x", (d, i) => { return this.legendElementWidth * i; })
            .attr("y", this.height + this.gridSize / 2);





        // var legend = svg.selectAll(".legend")
        //     .data([0].concat(colorScale.quantiles()), function(d) { return d; });




    }

    onTileClick(day : number, hour : number, value : number) {
        if(day === 1) {
            this.plotDonut(day, hour, value, "jun-20-div");
        } else if(day === 2) {
            this.plotDonut(day, hour, value, "jun-21-div");
        } else if(day ===3) {
            this.plotDonut(day, hour, value, "jun-22-div");
        } else if(day ===4) {
            this.plotDonut(day, hour, value, "jun-23-div");
        }


    }

    plotDonut(day : number, hour : number, value : number, divName :string) {

        var status = d3.select("svg.donutSvg-"+divName).empty();
        if(status) {
            console.log("Nothing to remove");
        } else {
            console.log("Removing");
            d3.select("svg.donutSvg-jun-20-div").remove();
        }

        var dataset = this.getMinuteData(value);

        var colorRange = d3Colors.interpolateRgb('white', 'black');

        console.log('colorRange : ' + colorRange(0), colorRange(1));
        var heatmapColour = d3Scale.scaleLinear();
        heatmapColour.domain([value - 50, value + 50]);
        heatmapColour.range([
            0, colorRange.length - 1
        ]);


        // var color = d3Scale.scaleOrdinal().range(colScheme);
        var pie = d3Shape.pie().sort(null).value((d : Hour) => 1);

        var pw = 200,
            ph = 200;

        var outerRadius = pw / 2;
        var innerRadius = pw / 3;

        var arc  = d3Shape.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);


        var svg = d3.select("div#" + divName)
            .append('svg')
            .attr('class', 'donutSvg-'+divName)
            .attr('width', pw)
            .attr('height', ph);

        var arcs = svg.selectAll('g.arc')
            .data(pie(dataset))
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('transform', 'translate(' + outerRadius + ', ' + outerRadius + ')')



        arcs.append('path')
            .attr('d', <any>arc)
            .attr('fill', (d) => {
                if(value < 200)
                    return "#c8e6c9";
                else if(value < 300) {
                    return "#fff59d";
                } else if(value < 500) {
                    return "#ffa726";

                } else {
                    return "#ff5722";
                }
            });

        arcs.append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '1em')
            .attr('y', 12)
            .text(value+ '(ms) | '+hour+':00');














    }


    prepareData() {

        this.getDays(1);
        this.getDays(2);
        this.getDays(3);
        this.getDays(4);
        this.getDays(5);


    }

    getDays(dayName : number)  {

        for(var i=1; i<=24; i++) {
            var d = new Day();
            d.dayName = dayName;
            d.hourName = i;
            d.value = this.getRandomNumber();
            this.data.push(d);
        }


}

    getMinuteData(value : number) : Hour[] {
        var arr : Hour[] =  [];
        for(var i=1; i<=60; i++) {
            var h = new Hour();
            h.value = this.getMinRandomNumber(value - 50, value + 50);
            h.hourName = i;
            arr.push(h);
        }
        return arr;
    }

    getMinRandomNumber(min : number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomNumber() {

        return Math.floor(Math.random() * 600) + 100;
    }






























}