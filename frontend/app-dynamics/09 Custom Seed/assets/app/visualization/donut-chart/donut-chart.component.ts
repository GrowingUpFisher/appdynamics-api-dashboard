/**
 * Created by dkandpal on 8/1/17.
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
import {Day} from "../../model/testData";
@Component({
    selector: 'donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.css']
})
export class DonutChart implements OnInit {

    @Input()
    inputData : Day;
    width : number = 360;
    height : number = 360;
    radius : number = 180;
    donutWidth : number = 75;
    color;

    @Input()
    boxColor;

    @Input()
    hourVal;

    constructor(private dashboardService : DashboardService,
                private cachedDataService : CachedDataService) {}

    ngOnInit() {
        //this.color = d3.interpolateRgb('#f4e241', '#f44141');
        //this.color = d3.scaleLinear().domain([100,1000]).interpolate();
        // this.setColorScheme();
        // this.buildDonutChart();
    }

    ngOnChanges(changes : SimpleChanges) {

        if(changes['inputData']) {
            this.setColorScheme();
            this.buildDonutChart();
        }
    }

    setColorScheme() {
        console.log('This.boxcolor : ' + this.boxColor);
        if(this.boxColor <325) {
            console.log('Selecting green');
            this.color = d3.interpolateRgb('#81c784', '#1b5e20');
        } else if(this.boxColor <355) {
            console.log('Selecting yellow');
            this.color = d3.interpolateRgb('#fff9c4', '#f9a825');
        }
        else if(this.boxColor <370) {
            console.log('Selecting orange');
            this.color = d3.interpolateRgb('#ffab91', '#e64a19');
        }
        else {
            console.log('Selecting red');
            this.color = d3.interpolateRgb('#ffcdd2', '#b71c1c')
        }
    }

    buildDonutChart() {

        d3.select('.donut-svg').remove();


        var tooltip = d3.select('#donut-chart')
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');




        var svg = d3.select('#donut-chart')
            .append('svg')
            .attr("class", "donut-svg")
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + (this.width / 2) +
                ',' + (this.height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(this.radius - this.donutWidth)
            .outerRadius(this.radius);




        var pie = d3.pie().sort(null);

        var legendRectSize = 18;
        var legendSpacing = 4;

        var d : Array<number> = [];
        var keys = []
        for(var key in this.inputData.minuteValues) {
            if(this.inputData.minuteValues.hasOwnProperty(key)) {
               d.push(this.inputData.minuteValues[key].value);
               keys.push(key);
            }
        }

        var path = svg.selectAll('path')
            .data(pie(d))
            .enter()
            .append('path')
            .attr('d', <any>arc)
            .attr('fill',( d, i) =>  {
                console.log("d" + JSON.stringify(d));
                console.log('i' + i);
                const value = this.inputData.minuteValues[keys[i]].value;
                //const value = dataset[i].value;
                console.log('value : ' + value);
                console.log('scale : ' + this.color(value / 900));
                return this.color(value / 1000);
            });

        var div = d3.select("#donut-chart").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        path.on('mouseover', (d) => {
            console.log('d on hover :' +JSON.stringify(d));
            const time = keys[d.index];// this.inputData.minuteValues[keys[d.index]];
            div.transition().duration(100).style("opacity", .9);

            div.html(this.hourVal + ': ' + time+' | '+d.value + "(ms)")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 18) + "px");
        })
            .on('mouseout', (d) => {
                div.transition().duration(100).style("opacity", 0);
            })


        svg.append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '1em')
            .attr('y', 9)
            .text(Math.round(this.boxColor)+ ' (ms) | '+this.hourVal+':00');


    }

    generateColor() {

        return ['#660000', '#990000', '#CC0000', '#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC']

    }

    generateColorArray(r,g,b) {
        var max = Math.max(r,Math.max(g,b));

        var step = Number(Math.ceil(255 / (max * 10)));
        const arr = [];
        arr.push(this.rgbToHex(r * step, g * step, b * step));
        arr.push(this.rgbToHex(r * step * 2, g * step * 2, b * step * 2));
        arr.push(this.rgbToHex(r * step * 3, g * step * 3, b * step * 3));
        arr.push(this.rgbToHex(r * step * 4, g * step * 4, b * step * 4));
        console.log('arr :' + arr);
        return arr;

    }

     componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

     rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

}
