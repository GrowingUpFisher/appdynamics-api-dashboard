import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { StandaloneComponent } from './dashboard/standalone/standalone.component';
import { CompareComponent } from './dashboard/compare/compare.component';
import {StandaloneMetricViewComponent} from './standalone-metric-view/standalone-metric-view.component';
import { TrendsComponent } from './dashboard/trends/trends.component';
import {MultiSeriesLineComponent} from './visualization/multiseries-line-graph/multiseries-line-graph.component';

const APP_ROUTES: Routes = [
    { path: 'viz', component: VisualizationComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent, children: [
        {
            path: 'standalone', component: StandaloneComponent, children : [
            {path : 'config/:podRealmAppId', component : StandaloneMetricViewComponent, children : [
                {path  : 'metrics/:metricName' , component : MultiSeriesLineComponent}
            ]}
        ]
        },
        { path: 'compare', component: CompareComponent },
        {path : 'trends', component : TrendsComponent,  },
        //{path : 'compare', component : MultiSeriesLineComponent}
    ]
    }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
