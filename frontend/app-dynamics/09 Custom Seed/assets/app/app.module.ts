import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { CachedDataService } from './services/cached-data.service';
import { APP_ROUTING } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { ScatterPlotComponent } from './visualization/scatter-plot/scatter-plot.component';
import { LineGraphComponent } from './visualization/line-graph/line-graph.component';
import {StandaloneComponent} from './dashboard/standalone/standalone.component';
import {CompareComponent} from './dashboard/compare/compare.component';
import {StandaloneMetricViewComponent} from './standalone-metric-view/standalone-metric-view.component';
import {BarGraphComponent} from './visualization/bar-graph/bar-graph.component';
import {HeatMapComponent} from './visualization/heatmap/heatmap.component';
import { TrendsComponent } from './dashboard/trends/trends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MultiSeriesLineComponent} from './visualization/multiseries-line-graph/multiseries-line-graph.component';
import {MultipleLineSeriesComponent} from './visualization/multiple-time-series-graph/multiple-time-series-graph';
import {RTLineChart} from './visualization/rt-line-chart/rt-line-chart.component';
import {TreeModule} from 'angular-tree-component';
import {CreateComponent} from "./create/create.component";
import {VizDashboard} from "./viz-dashboard/viz-dashboard.component";
import {DashboardService} from "./services/dashboard.service";
import {ObjectTypeTransformer} from "./services/object-type-transform.pipe";
import {NglModule} from 'ng-lightning/ng-lightning'
import {DonutChart} from "./visualization/donut-chart/donut-chart.component";
import {RtMultiseriesLineChart} from "./visualization/rt-multiseries-line-chart/rt-multiseries-line-chart.component";



@NgModule({
    declarations: [AppComponent, LoginComponent, DashboardComponent,
        //,VisualizationComponent
         ScatterPlotComponent, LineGraphComponent, StandaloneComponent, CompareComponent,
        StandaloneMetricViewComponent, BarGraphComponent, HeatMapComponent,
        TrendsComponent, MultiSeriesLineComponent, MultipleLineSeriesComponent, RTLineChart, HeatMapComponent,
        CreateComponent, VizDashboard, ObjectTypeTransformer, DonutChart, RtMultiseriesLineChart],

    imports: [BrowserModule, ReactiveFormsModule, FormsModule,
        HttpModule, APP_ROUTING, BrowserAnimationsModule, TreeModule],
    bootstrap: [AppComponent],
    providers: [CachedDataService, DashboardService]
})
export class AppModule {

}