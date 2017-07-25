import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { StandaloneComponent } from './dashboard/standalone/standalone.component';
import { CompareComponent } from './dashboard/compare/compare.component';
import {StandaloneMetricViewComponent} from './standalone-metric-view/standalone-metric-view.component';
import { TrendsComponent } from './dashboard/trends/trends.component';
import {MultiSeriesLineComponent} from './visualization/multiseries-line-graph/multiseries-line-graph.component';
import {CreateComponent} from "./create/create.component";
import {VizDashboard} from "./viz-dashboard/viz-dashboard.component";

const APP_ROUTES: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent, children: [
        {path: ':podRealmAppId/viz', component: VizDashboard, children : [
            {
                path : 'view', component : StandaloneMetricViewComponent
            },
            {
                path : 'create', component : CreateComponent
            }
        ]},

        ]
    }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
